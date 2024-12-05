import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const HabitForm = ({ addHabit }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = () => {
    if (habitName.trim()) {
      addHabit({ name: habitName, completed: false });
      setHabitName(''); // Limpiar el campo después de agregar
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nuevo hábito"
        value={habitName}
        onChangeText={(text) => setHabitName(text)}
      />
      <Button title="Agregar Hábito" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flexGrow: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingLeft: 10,
  },
});

export default HabitForm;
