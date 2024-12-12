import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import HabOrRemScreen from './screens/HabOrRemScreen';
import RemindersScreen from './screens/RemindersScreen';
import TimerOrCheckScreen from './screens/TimerOrCheckScreen';
import AddCheckHabitScreen from './screens/AddCheckHabitScreen';
import AddTimerHabitScreen from './screens/AddTimerHabitScreen';
import AddRemScreen from './screens/AddRemScreen';

const Stack = createStackNavigator();

function App() {
  const [habits, setHabits] = useState([]);
  const [reminders, setReminders] = useState([]);

  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]); // Agregar el hábito al estado global
  };
  
  // Función para convertir tiempo a minutos totales
  const parseTime = (time) => {
    if (!time) return 0;
  
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1).map(Number);
    const period = time.toLowerCase().includes("p.m.") ? "p.m." : "a.m.";
  
    let adjustedHours = hours;
    if (period === "p.m." && hours !== 12) adjustedHours += 12;
    else if (period === "a.m." && hours === 12) adjustedHours = 0;

    return adjustedHours * 60 + minutes; // Convertir a minutos totales
  };
  
  // Función para ordenar recordatorios por fecha y hora
  const sortReminders = (reminders) => {
    return reminders.sort((a, b) => {
      // Ajustar las fechas para comparar solo el día
      const dateA = new Date(a.selectedDate).setHours(0, 0, 0, 0); // Solo fecha
      const dateB = new Date(b.selectedDate).setHours(0, 0, 0, 0); // Solo fecha

      if (dateA !== dateB) return dateA - dateB; // Ordenar por fecha primero
      return parseTime(a.time) - parseTime(b.time); // Ordenar por tiempo
    });
  };
  
  // Función para agregar un recordatorio

  const addReminder = (newReminder) => {
    setReminders((prevReminders) => {
      const updatedReminders = [...prevReminders, newReminder];
  
      return sortReminders(updatedReminders); // Ordenar recordatorios después de agregar
    });
  };
  
  // Función para editar un recordatorio
  const editReminder = (updatedReminder, index) => {
    setReminders((prevReminders) => {
      const updatedReminders = [...prevReminders];
      updatedReminders[index] = updatedReminder;
  
      return sortReminders(updatedReminders); // Ordenar recordatorios después de editar
    });
  };
  

  const deleteReminder = (index) => {
    setReminders((prevReminders) =>
      prevReminders.filter((_, i) => i !== index)
    );
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
          {props => (
            <RemindersScreen 
              {...props} 
              reminders={reminders} 
              deleteReminder={deleteReminder} 
            />
          )}   
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
        {props => <TimerOrCheckScreen {...props} addHabit={addHabit} />}
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
            addReminder={addReminder} // Pasar función para agregar recordatorios
            editReminder={editReminder} // Pasar función para editar recordatorios
          />
          )}
      </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;