import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import AddHabitOrReminder from '../components/AddHabitOrReminder';
import ProgressCircle from '../components/ProgressCircle';
import HabitList from '../components/HabitList';
import DailyActivities from '../components/DailyActivities';
import MyHabits from '../components/MyHabits';
function HabOrRemScreen({ navigation, habits, reminders, addHabit, addReminder, toggleHabitCompletion, handleHabitNameChange }) { 
    return(  
        <View style={styles.container}>
        <AddHabitOrReminder 
            onAddHabit={addHabit} 
            onAddReminder={addReminder} 
        />
        </View>    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    scrollViewContent: {
      flexGrow: 1, // Permite que el contenido de ScrollView crezca según su contenido
      paddingBottom: 16, // Espacio en la parte inferior
    },
  });
  
  export default HabOrRemScreen;