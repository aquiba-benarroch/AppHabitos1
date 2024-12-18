import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import HabOrRemScreen from './screens/HabOrRemScreen';
import RemindersScreen from './screens/RemindersScreen';
import AddCheckHabitScreen from './screens/AddCheckHabitScreen';
import AddRemScreen from './screens/AddRemScreen';
import HabitsInfoScreen from './screens/HabitsInfoScreen';

const Stack = createStackNavigator();

function App() {
  const [habits, setHabits] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Inicializar el progreso diario de los hábitos
  const initializeDailyProgress = () => {
    const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato 'YYYY-MM-DD'

    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (!habit.progress) {
          habit.progress = {}; // Crear un registro de progreso si no existe
        }
        if (!habit.progress[today]) {
          habit.progress[today] = false; // Establecer como incompleto si no existe para hoy
        }
        return habit;
      })
    );
  };

  useEffect(() => {
    const initializeProgressAndCheckNewDay = async () => {
      await initializeDailyProgress(); // Ejecutar al iniciar la app
  
      const checkNewDay = setInterval(async () => {
        const currentDate = new Date().toISOString().split("T")[0];
        const lastUpdateDate = await AsyncStorage.getItem("lastUpdateDate");
  
        if (lastUpdateDate !== currentDate) {
          await initializeDailyProgress();
          await AsyncStorage.setItem("lastUpdateDate", currentDate); // Actualizar la fecha de última verificación
        }
      }, 60 * 1000); // Cada minuto
  
      return () => clearInterval(checkNewDay); // Limpiar el intervalo al desmontar
    };
  
    initializeProgressAndCheckNewDay();
  }, []);

  const addHabit = (newHabit) => {
    setHabits([
      ...habits,
      {
        ...newHabit,
        completionHistory: {}, // Inicializar el historial vacío
      },
    ]);
  };

  const toggleHabitCompletion = (habitIndex) => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
  
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) => {
        if (index === habitIndex) {
          return {
            ...habit,
            completionHistory: {
              ...habit.completionHistory,
              [selectedDateString]: !habit.completionHistory?.[selectedDateString],
            },
          };
        }
        return habit;
      })
    );
  };
  
  const editHabit = (updatedHabit, index) => {
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[index] = updatedHabit; // Reemplazamos sólo el hábito correspondiente
      return updatedHabits;
    });
  };

  const deleteHabit = (index) => {
    setHabits((prevHabits) => prevHabits.filter((_, i) => i !== index));
  };

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => (
            <HomeScreen
              {...props}
              habits={habits}
              toggleHabitCompletion={toggleHabitCompletion} // Pasar la función para alternar el estado de completado
              setHabits={setHabits}
              reminders={reminders}
              addReminder={addReminder}
              addHabit={addHabit}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Habits">
          {props => (
            <HabitsScreen
              {...props}
              habits={habits}
              deleteHabit={deleteHabit}
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

        <Stack.Screen name="AddCheckHabitScreen">
          {props => {
            const { editingHabit, index } = props.route.params || {}; // Verificar si se está editando un hábito

            return (
              <AddCheckHabitScreen
                {...props}
                addHabit={(newHabit) => {
                  addHabit(newHabit); // Agregar un nuevo hábito
                  props.navigation.navigate('Home');
                }}
                editHabit={(updatedHabit) => {
                  if (editingHabit && index !== undefined) {
                    editHabit(updatedHabit, index); // Editar un hábito existente
                  }
                  props.navigation.navigate('Home');
                }}
              />
            );
          }}
        </Stack.Screen>


        <Stack.Screen name="HabitsInfo" options={{ headerTitle: 'Información del Hábito' }}>
          {(props) => {
            const { habit, index } = props.route.params || {}; // Extraer habit y index
            return (
              <HabitsInfoScreen
                {...props}
                habit={habit}
                deleteHabit={() => {
                  if (index !== undefined) {
                    deleteHabit(index); // Pasar la función deleteHabit con índice
                  }
                }}
                editHabit={(updatedHabit) => {
                  if (index !== undefined) {
                    editHabit(updatedHabit, index); // Pasar la función editHabit con índice
                  }
                }}
              />
            );
          }}
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
