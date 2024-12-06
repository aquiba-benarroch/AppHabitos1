/*
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AddHabitOrReminder from '../components/AddHabitOrReminder';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import DailyActivities from '../components/DailyActivities';

function HomeScreen({ navigation, habits, reminders, addHabit, addReminder, toggleHabitCompletion, handleHabitNameChange }) {
  return (
    <View style={styles.container}>
      //{ Cabecera con el título principal }
      <Text style={styles.title}>Gestión de Hábitos y Recordatorios</Text>

     // {Contenido principal en ScrollView }
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        //{ Indicador de progreso de hábitos }
        <ProgressCircle habits={habits} />
        //{ Botón flotante para agregar hábitos o recordatorios }
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HabOrRem')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <HabitList
          habits={habits}
          onToggleCompletion={toggleHabitCompletion}
          onHabitNameChange={handleHabitNameChange}
        />

        <DailyActivities reminders={reminders} />

        //{ Botones de navegación }
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Habits')}
          >
            <Text style={styles.navButtonText}>Ir a Hábitos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Reminders')}
          >
            <Text style={styles.navButtonText}>Ir a Recordatorios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16, // Espacio inferior
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  navigationButtons: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
*/

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';


function HomeScreen({
  navigation,
  route,
  habits: initialHabits, // Array inicial de hábitos
}) {
  const [selectedDay, setSelectedDay] = useState('lunes'); // Día seleccionado por defecto
  const [habits, setHabits] = useState(initialHabits); // Estado local para manejar los hábitos
  
  useEffect(() => {
    if (route.params?.newHabit) {
      setHabits((prevHabits) => [...prevHabits, route.params.newHabit]);
    }

  }, [route.params?.newHabit]);
  // Filtrar los hábitos para el día seleccionado
  const filteredHabits = habits.filter((habit) => habit.day === selectedDay);

  // Calcular el porcentaje de hábitos completados
  const getCompletionPercentage = () => {
    const completedHabits = filteredHabits.filter((habit) => habit.completed).length;
    return Math.round((completedHabits / (filteredHabits.length || 1)) * 100); // Evitar división por 0
  };

  // Alternar el estado de un hábito
  const toggleHabitCompletion = (index) => {
    const updatedHabits = [...habits];
    const habitIndex = habits.findIndex(
      (habit) => habit.day === selectedDay && habit === filteredHabits[index]
    );
    if (habitIndex >= 0) {
      updatedHabits[habitIndex].completed = !updatedHabits[habitIndex].completed;
      setHabits(updatedHabits);
    } else {
      Alert.alert('Error', 'No se pudo encontrar el hábito.');
    }
  };

  // Cambiar el nombre de un hábito
  const handleHabitNameChange = (index, newName) => {
    const updatedHabits = [...habits];
    const habitIndex = habits.findIndex(
      (habit) => habit.day === selectedDay && habit === filteredHabits[index]
    );
    if (habitIndex >= 0) {
      updatedHabits[habitIndex].name = newName;
      setHabits(updatedHabits);
    } else {
      Alert.alert('Error', 'No se pudo encontrar el hábito.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de días con botones */}
      <View style={styles.daysBar}>
        {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              selectedDay === day && styles.selectedDay, // Estilo para el día seleccionado
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
              {day.slice(0, 2).toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progreso del día */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Hábitos del día completados</Text>
        <ProgressCircle habits={filteredHabits} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Lista de hábitos filtrados */}
        <HabitList
          habits={filteredHabits}
          setHabits={setHabits}
          onToggleCompletion={toggleHabitCompletion}
          onHabitNameChange={handleHabitNameChange}
        />
      </ScrollView>

      {/* Botón flotante para agregar */}
      <AddButton onPress={() => navigation.navigate('HabOrRem')} />

      <BottomNav />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  daysBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  selectedDayText: {
    color: '#fff',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 80, // Se coloca justo arriba de la barra de navegación inferior
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribuye los elementos uniformemente
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default HomeScreen;