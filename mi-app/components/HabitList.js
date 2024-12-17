import React from 'react';
import { View, StyleSheet } from 'react-native';
import HabitItem from './HabitItem';

const HabitList = ({ habits, onToggleCompletion, selectedDate }) => {
  return (
    <View style={styles.habitList}>
      {habits.map((habit) => (
        <HabitItem
          key={habit.globalIndex} // Usa el índice global como clave
          habit={habit}
          selectedDate={selectedDate}
          onToggle={() => onToggleCompletion(habit.globalIndex)} // Pasa el índice global
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

