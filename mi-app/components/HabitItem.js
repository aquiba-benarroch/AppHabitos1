import React from 'react';
import { View, TextInput, Switch, StyleSheet } from 'react-native';

const HabitItem = ({ habit, onToggle, onNameChange }) => {
  return (
    <View style={styles.habitItem}>
      <Switch 
        value={habit.completed} 
        onValueChange={onToggle} 
      />
      <TextInput 
        style={styles.input}
        value={habit.name} 
        onChangeText={onNameChange} 
        placeholder="Escribe el nombre del hábito" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    paddingLeft: 10,
  },
});

export default HabitItem;
