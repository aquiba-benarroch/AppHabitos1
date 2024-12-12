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

function HomeScreen({ navigation, route, habits: globalHabits, setHabits }) {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleString('es-ES', { weekday: 'long' }).toLowerCase()
  );

  const [filteredHabits, setFilteredHabits] = useState([]);

  // Actualiza los hábitos filtrados cada vez que cambien los hábitos globales o el día seleccionado
  useEffect(() => {
    const habitsForSelectedDay = globalHabits.filter((habit) =>
      habit.days?.map((day) => day.toLowerCase()).includes(selectedDay)
    );
    setFilteredHabits(habitsForSelectedDay);
  }, [globalHabits, selectedDay]);

  // Alternar el estado de completado de un hábito
  const toggleHabitCompletion = (habitIndex) => {
    const updatedHabits = globalHabits.map((habit, index) => {
      if (filteredHabits[habitIndex] === habit) {
        return { ...habit, completed: !habit.completed };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  // Calcular el porcentaje de hábitos completados
  const getCompletionPercentage = () => {
    if (filteredHabits.length === 0) return 0;
    const completedHabits = filteredHabits.filter((habit) => habit.completed).length;
    return Math.round((completedHabits / filteredHabits.length) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Barra de días */}
      <View style={styles.daysBar}>
        {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map(
          (day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayContainer,
                selectedDay === day && styles.selectedDay,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day && styles.selectedDayText,
                ]}
              >
                {day.slice(0, 2).toUpperCase()}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Progreso del día */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Hábitos del día completados</Text>
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
            onToggleCompletion={toggleHabitCompletion}
          />
        ) : (
          <Text style={styles.noHabitsText}>
            No hay hábitos programados para este día.
          </Text>
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
  daysBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayContainer: { alignItems: 'center', padding: 10, borderRadius: 5 },
  selectedDay: { backgroundColor: '#007AFF' },
  selectedDayText: { color: '#fff' },
  dayText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  progressContainer: { alignItems: 'center', marginVertical: 20 },
  progressTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  scrollView: { flex: 1 },
  scrollViewContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16 },
  noHabitsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default HomeScreen;