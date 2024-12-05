import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function TimerOrCheckScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>¿Cómo vas a evaluar tu progreso?</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddCheckHabitScreen')}>
        <Text style={styles.buttonText}>Con un SÍ o NO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTimerHabitScreen')}>
        <Text style={styles.buttonText}>Con un timer</Text>
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

export default TimerOrCheckScreen;
