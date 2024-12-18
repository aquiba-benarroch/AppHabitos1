import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';
import CalendarBar from '../components/CalendarBar';

function HomeScreen({ navigation, route, habits: globalHabits, setHabits,reminders: globalReminders }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);

  // Actualiza los hábitos filtrados cada vez que cambien los hábitos globales o la fecha seleccionada
  useEffect(() => {
    const habitsForSelectedDay = (globalHabits || [])
      .map((habit, index) => ({ ...habit, globalIndex: index })) // Añade el índice global
      .filter((habit) => {
        const dayName = selectedDate.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
        const habitStartDate = new Date(habit.startDate);
        const habitEndDate = new Date(habit.endDate);
        habitEndDate.setHours(23, 59, 59, 999);
  
        const isWithinDateRange =
          selectedDate >= habitStartDate && selectedDate <= habitEndDate;
  
        const isMatchingDay = habit.days
          ?.map((day) => day.toLowerCase())
          .includes(dayName);
  
        return isWithinDateRange && isMatchingDay;
      });
  
    setFilteredHabits(habitsForSelectedDay);
  }, [globalHabits, selectedDate]);
  
  
  useEffect(() => {
    const remindersForSelectedDay = (globalReminders || []).filter((reminder) => {
      const dayName = selectedDate.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
      const matchesDay = reminder.days?.map((day) => day.toLowerCase()).includes(dayName);
      const matchesDate = reminder.selectedDate
        ? new Date(reminder.selectedDate).toDateString() === selectedDate.toDateString()
        : false;
  
      return matchesDay || matchesDate;
    });
    setFilteredReminders(remindersForSelectedDay);
  }, [globalReminders, selectedDate]);
  
  // Reinicia los hábitos al inicio del día
    useEffect(() => {
      const todayString = new Date().toISOString().split('T')[0];
  
      const updatedHabits = globalHabits.map((habit) => {
        if (habit.lastUpdated !== todayString) {
          return {
            ...habit,
            completionHistory: {
              ...habit.completionHistory,
              [todayString]: false, // Reinicia el estado de completado
            },
            lastUpdated: todayString,
          };
        }
        return habit;
      });
  
      setHabits(updatedHabits);
    }, [selectedDate]);

  // Alternar el estado de completado de un hábito para la fecha seleccionada
  const toggleHabitCompletion = (habitIndex) => {
    const selectedDateString = selectedDate.toISOString().split('T')[0]; // Fecha seleccionada como string
  
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) => {
        if (index === habitIndex) {
          // Actualiza solo el hábito correcto
          const updatedCompletionHistory = {
            ...habit.completionHistory,
            [selectedDateString]: !habit.completionHistory?.[selectedDateString],
          };
  
          return {
            ...habit,
            completionHistory: updatedCompletionHistory,
          };
        }
        return habit;
      })
    );
  };  

  const renderHabitItem = ({ item, index }) => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const isCompleted = item.completionHistory?.[selectedDateString] || false; // Obtener el estado de completado para el día seleccionado

    return (
        <View style={styles.habitContainer}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Switch
                value={isCompleted} // Estado del switch basado en el historial
                onValueChange={() => toggleHabitCompletion(index)} // Alternar el estado al cambiar el switch
            />
        </View>
    );
  };


  // Calcular el porcentaje de hábitos completados
  const getCompletionPercentage = () => {
    if (filteredHabits.length === 0) return 0;
    const completedHabits = filteredHabits.filter((habit) => {
      const dateKey = selectedDate.toISOString().split('T')[0];
      return habit.completionHistory?.[dateKey];
    }).length;
    return Math.round((completedHabits / filteredHabits.length) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Barra de días reemplazada por el componente CalendarBar */}
      <CalendarBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Progreso del día */}
      <View style={styles.progressContainer}>
        <Text style={styles.sectionTitle}>Hábitos del día completados</Text>
        <ProgressCircle progress={getCompletionPercentage()} />
      </View>

      {/* Lista de hábitos */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {filteredHabits.length > 0 ? (
          <HabitList
          habits={filteredHabits}
          onToggleCompletion={(index) => toggleHabitCompletion(index)}
          selectedDate={selectedDate} // Pasar la fecha seleccionada
        />
        ) : (
          <Text style={styles.noDataText}>
            No hay hábitos programados para este día.
          </Text>
        )}
      </ScrollView>
      
      <Text style={styles.sectionTitle}>Recordatorios</Text>

      {/* Lista de recordatorios */}
      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.scrollViewContent, { paddingBottom: 65 }]}>
        {filteredReminders.length > 0 ? (
          filteredReminders.map((reminder, index) => (
            <View key={index} style={styles.reminderContainer}>
              <Text style={styles.reminderTitle}>{reminder.name || 'Sin título'}</Text>
              <Text style={styles.reminderDetails}>
                {reminder.time || 'Sin hora'} - {reminder.days?.join(', ') || 'Sin días'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No hay recordatorios programados para este día.</Text>
        )}
      </ScrollView>

      {/* Botón para agregar */}
      <AddButton onPress={() => navigation.navigate('HabOrRem')} />

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 16 },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 10, // Reducir el espacio vertical
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8, // Reducir espacio debajo del título
  },
  scrollView: { flex: 1 },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  habitContainer: {
    padding: 8, // Reducir padding de los hábitos
    marginVertical: 4, // Reducir espacio vertical entre hábitos
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15, // Agregar espacio superior para separar del componente anterior
    marginBottom: 8, // Reducir margen inferior
    textAlign: 'center', // Alinear con el contenido
  },
  scrollViewReminders: {
    maxHeight: 150, // Limitar la altura de los recordatorios
    marginTop: -5, // Subir la sección de recordatorios
  },
  reminderContainer: {
    padding: 8, // Reducir padding
    marginVertical: 4, // Reducir espacio entre recordatorios
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  reminderDetails: {
    fontSize: 13,
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});
export default HomeScreen;