import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function TimerOrCheckScreen({ navigation, route }) {
  const { onSave } = route.params; // Recibir la función para guardar el hábito

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>¿Cómo vas a evaluar tu progreso?</Text>

      {/* Opción para agregar un hábito con SÍ o NO */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddCheckHabitScreen', { onSave })}
      >
        <Text style={styles.buttonText}>Con un SÍ o NO</Text>
      </TouchableOpacity>

      {/* Opción para agregar un hábito con un temporizador */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTimerHabitScreen', { onSave })}
      >
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