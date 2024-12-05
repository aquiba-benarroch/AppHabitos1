import React from 'react';
import { View, StyleSheet } from 'react-native';
import HabitItem from './HabitItem';

const HabitList = ({ habits, onToggleCompletion, onHabitNameChange }) => {
  return (
    <View style={styles.habitList}>
      {habits.map((habit, index) => (
        <HabitItem 
          key={index} 
          habit={habit} 
          onToggle={() => onToggleCompletion(index)} 
          onNameChange={(newName) => onHabitNameChange(index, newName)} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  habitList: {
    padding: 10,
    flexGrow: 1,
  },
});

export default HabitList;
