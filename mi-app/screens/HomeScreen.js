//Codigo anterior
/*
// screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import AddHabitOrReminder from '../components/AddHabitOrReminder';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import DailyActivities from '../components/DailyActivities';
import MyHabits from '../components/MyHabits';

function HomeScreen({ navigation, habits, reminders, addHabit, addReminder, toggleHabitCompletion, handleHabitNameChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Hábitos y Recordatorios</Text>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps='handled'>
        <ProgressCircle habits={habits} />
        <Button
          title="+"
          onPress={() => navigation.navigate('HabOrRem')}
        />
        <HabitList 
          habits={habits} 
          onToggleCompletion={toggleHabitCompletion} 
          onHabitNameChange={handleHabitNameChange}
        />

        <DailyActivities reminders={reminders} />

        <MyHabits habits={habits} />

        <Button
          title="Ir a Pantalla de Hábitos"
          onPress={() => navigation.navigate('Habits')}
        />
        <Button
          title="Ir a Pantalla de Recordatorios"
          onPress={() => navigation.navigate('Reminders')}
        />
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1, // Permite que el contenido de ScrollView crezca según su contenido
    paddingBottom: 16, // Espacio en la parte inferior
  },
});

export default HomeScreen;
*/



import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AddHabitOrReminder from '../components/AddHabitOrReminder';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import DailyActivities from '../components/DailyActivities';

function HomeScreen({ navigation, habits, reminders, addHabit, addReminder, toggleHabitCompletion, handleHabitNameChange }) {
  return (
    <View style={styles.container}>
      {/* Cabecera con el título principal */}
      <Text style={styles.title}>Gestión de Hábitos y Recordatorios</Text>

      {/* Contenido principal en ScrollView */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Indicador de progreso de hábitos */}
        <ProgressCircle habits={habits} />

        {/* Botón flotante para agregar hábitos o recordatorios */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HabOrRem')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Lista de hábitos */}
        <HabitList
          habits={habits}
          onToggleCompletion={toggleHabitCompletion}
          onHabitNameChange={handleHabitNameChange}
        />

        {/* Lista de actividades diarias */}
        <DailyActivities reminders={reminders} />

        {/* Botones de navegación */}
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
