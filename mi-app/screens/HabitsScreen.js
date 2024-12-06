// screens/HabitsScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HabitList from '../components/HabitList';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';
import { useNavigation } from '@react-navigation/native';

function HabitsScreen({ habits, toggleHabitCompletion, handleHabitNameChange }) {
  const navigation = useNavigation();
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
      <AddButton onPress={() => navigation.navigate('TimerOrCheckScreen')} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1, // Permite que el contenido de ScrollView crezca según su contenido
    paddingHorizontal: 16,
    paddingBottom: 80, // Espacio adicional para no cubrir el contenido con el BottomNav
  },
});

export default HabitsScreen;
