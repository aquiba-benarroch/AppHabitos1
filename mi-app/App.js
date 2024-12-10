import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import HabOrRemScreen from './screens/HabOrRemScreen';
import RemindersScreen from './screens/RemindersScreen';
import TimerOrCheckScreen from './screens/TimerOrCheckScreen';
import AddCheckHabitScreen from './screens/AddCheckHabitScreen';
import AddRemScreen from './screens/AddRemScreen';

const Stack = createStackNavigator();

function App() {
  const [habits, setHabits] = useState([]);
  const [reminders, setReminders] = useState([]);

  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]); // Agregar el hábito al estado global
  };

  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  const toggleHabitCompletion = (index) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        return { ...habit, completed: !habit.completed };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const handleHabitNameChange = (index, newName) => {
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
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {props => (
          <HomeScreen
            {...props}
            habits={habits}
            setHabits={setHabits} // Pasar la función para actualizar los hábitos
            reminders={reminders}
            addHabit={addHabit}
            addReminder={addReminder}
            toggleHabitCompletion={toggleHabitCompletion}
            handleHabitNameChange={handleHabitNameChange}
          />
        )}
      </Stack.Screen>

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
          {props => <RemindersScreen {...props} reminders={reminders} />}
        </Stack.Screen>

        <Stack.Screen name="HabOrRem">
        {props => (
          <HabOrRemScreen
            {...props}
            addHabit={addHabit}
            addReminder={addReminder}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="TimerOrCheckScreen">
      {props => (
        <TimerOrCheckScreen
          {...props}
          addHabit={addHabit} // Pasar la función para agregar un hábito
        />
      )}
    </Stack.Screen>

      <Stack.Screen name="AddCheckHabitScreen">
        {props => (
          <AddCheckHabitScreen
            {...props}
            addHabit={newHabit => {
              addHabit(newHabit);
              props.navigation.navigate('Home');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AddTimerHabitScreen">
      {props => (
        <AddTimerHabitScreen
          {...props}
          addHabit={(newHabit) => {
            addHabit({
              ...newHabit,
              completed: false, // Asegurar que cada nuevo hábito tenga esta propiedad
            });
            props.navigation.navigate('Home'); // Navega a HomeScreen
          }}
        />
      )}
    </Stack.Screen>

      <Stack.Screen name="AddRem">
        {props => (
          <AddRemScreen
            {...props}
            addReminder={newReminder => {
              addReminder(newReminder); // Llama a la función global para agregar el recordatorio
              props.navigation.navigate('Home'); // Redirige a Home
            }}
          />
        )}
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;