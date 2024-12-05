import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AddHabitOrReminder = ({ onAddHabit, onAddReminder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>¿Quieres agregar un hábito o un recordatorio para hoy?</Text>
      <Button title="Hábito" onPress={onAddHabit} />
      <Button title="Recordatorio" onPress={onAddReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AddHabitOrReminder;
