// screens/HabitsScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HabitList from '../components/HabitList';

function HabitsScreen({ habits, toggleHabitCompletion, handleHabitNameChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Hábitos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HabitList 
          habits={habits}
          onToggleCompletion={toggleHabitCompletion} 
          onHabitNameChange={handleHabitNameChange}
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

export default HabitsScreen;
