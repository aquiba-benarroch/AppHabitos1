import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddHabitOrReminder from '../components/AddHabitOrReminder';


function HabOrRemScreen({ navigation, habits, reminders, addHabit, addReminder, toggleHabitCompletion, handleHabitNameChange }) { 
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>¿Quieres agregar un hábito o un recordatorio para hoy?</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => {
          addHabit();
          navigation.navigate('TimerOrCheckScreen');
        }}>
        <Text style={styles.buttonText}>Agregar Hábito</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
          addReminder();
          navigation.navigate('TimerOrCheckScreen');
        }}>
        <Text style={styles.buttonText}>Agregar Recordatorio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HabOrRemScreen;
