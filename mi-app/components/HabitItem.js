import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usaremos íconos para los checkboxes

const HabitItem = ({ habit, onToggle, selectedDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetear hora para comparación exacta

  const validSelectedDate =
    selectedDate instanceof Date && !isNaN(selectedDate)
      ? selectedDate
      : new Date();

  validSelectedDate.setHours(0, 0, 0, 0); // Resetear hora para comparación exacta

  // Obtener la fecha seleccionada como string en formato "YYYY-MM-DD"
  const selectedDateString = validSelectedDate.toISOString().split('T')[0];

  // Determinar si el hábito está completado para la fecha seleccionada
  const isCompleted = habit.completionHistory?.[selectedDateString] || false;

  // Determinar si el día seleccionado es un día futuro (excluye el día actual)
  const isFutureDay = validSelectedDate > today;

  return (
    <View
      style={[
        styles.habitContainer,
        isCompleted
          ? styles.completedBackground
          : isFutureDay
          ? styles.futureBackground
          : styles.incompleteBackground,
      ]}
    >
      {/* Checkbox interactivo */}
      <TouchableOpacity
        onPress={() => {
          if (isFutureDay) {
            Alert.alert('Bloqueado', 'No puedes completar hábitos de días futuros.');
          } else {
            onToggle(selectedDateString);
          }
        }}
        style={[
          styles.checkbox,
          isCompleted
            ? styles.checkboxCompleted
            : isFutureDay
            ? styles.checkboxFuture
            : styles.checkboxIncomplete,
        ]}
        disabled={isFutureDay} // Deshabilitar interacción para días futuros
      >
        {isCompleted && <Ionicons name="checkmark" size={20} color="#fff" />}
        {isFutureDay && <Ionicons name="lock-closed" size={20} color="#fff" />}
      </TouchableOpacity>

      {/* Nombre y descripción del hábito */}
      <View style={styles.habitDetails}>
        <Text style={styles.habitName}>{habit.name}</Text>
        {habit.description ? (
          <Text style={styles.habitDescription}>{habit.description}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff', // Fondo predeterminado
  },
  completedBackground: {
    backgroundColor: '#D4EDDA', // Verde claro para hábitos completados
  },
  incompleteBackground: {
    backgroundColor: '#E9ECEF', // Gris claro para hábitos incompletos
  },
  futureBackground: {
    backgroundColor: '#F8F9FA', // Fondo especial para días futuros
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxCompleted: {
    backgroundColor: '#28A745', // Verde para completados
  },
  checkboxIncomplete: {
    backgroundColor: '#6C757D', // Gris oscuro para incompletos
  },
  checkboxFuture: {
    backgroundColor: '#ADB5BD', // Gris claro para días futuros
  },
  habitDetails: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  habitDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default HabitItem;