// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import HabOrRemScreen from './screens/HabOrRemScreen';
import RemindersScreen from './screens/RemindersScreen';
import TimerOrCheckScreen from './screens/TimerOrCheckScreen';
import AddCheckHabitScreen from './screens/AddCheckHabitScreen';
import AddRemScreen from './screens/AddRemScreen';

// Create a Stack Navigator instance
const Stack = createStackNavigator();

function App() {
  // State to manage the list of habits
  const [habits, setHabits] = useState([]);
  // State to manage the list of reminders
  const [reminders, setReminders] = useState([]);

  // Function to add a new habit to the habits list
  const addHabit = (newHabit) => {
    // Add the new habit to the list, initializing it as not completed
    setHabits([...habits, { ...newHabit, completed: false }]);
  };

  // Function to add a new reminder to the reminders list
  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  // Function to toggle the completion status of a habit
  const toggleHabitCompletion = (index) => {
    // Map through habits and toggle the 'completed' property of the habit at the specified index
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        return { ...habit, completed: !habit.completed };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  // Function to handle changing the name of a habit
  const handleHabitNameChange = (index, newName) => {
    // Map through habits and update the 'name' property of the habit at the specified index
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        return { ...habit, name: newName };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen with all props passed to handle habits and reminders */}
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => (
            <HomeScreen
              {...props}
              habits={habits}
              reminders={reminders}
              addHabit={addHabit}
              addReminder={addReminder}
              toggleHabitCompletion={toggleHabitCompletion}
              handleHabitNameChange={handleHabitNameChange}
            />
          )}
        </Stack.Screen>
        {/* Habits Screen to view and manage habits */}
        <Stack.Screen name="Habits">
          {props => (
            <HabitsScreen
              {...props}
              habits={habits}
              toggleHabitCompletion={toggleHabitCompletion}
              handleHabitNameChange={handleHabitNameChange}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Reminders">
          {props => (
            <RemindersScreen
            {...props}
            reminders={reminders}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="HabOrRem">
          {props => (
            <HabOrRemScreen
              {...props}
              habits={habits}
              toggleHabitCompletion={toggleHabitCompletion}
              handleHabitNameChange={handleHabitNameChange}
              addHabit={addHabit}
              addReminder={addReminder}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TimerOrCheckScreen">
          {props => (
            <TimerOrCheckScreen {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddCheckHabitScreen">
          {props => (
            <AddCheckHabitScreen {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddRem" component={AddRemScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
