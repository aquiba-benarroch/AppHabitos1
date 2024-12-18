import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HabitItem from '../components/HabitItem';
import AddButton from '../components/AddButton';
import BottomNav from '../components/BottomNav';
import { useNavigation } from '@react-navigation/native';

const HabitsScreen = ({ habits, setHabits, deleteHabit, editHabit }) => {
  const navigation = useNavigation();

  const calculateStreak = (habit) => {
    let actualStreak = 0;
    let bestStreak = 0;
    let currentStreak = 0;
  
    const today = new Date().toISOString().split('T')[0];
    const days = Object.keys(habit.completionHistory || {}).sort(); // Ordenar fechas
  
    days.forEach((day) => {
      if (habit.completionHistory[day]) {
        currentStreak += 1;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
      } else if (day < today) {
        currentStreak = 0; // Resetear si no está completado en un día anterior
      }
    });
  
    actualStreak = currentStreak;
  
    return actualStreak;
  };
  useEffect(() => {
    const updatedHabits = habits.map((habit) => {
      const newStreak = calculateStreak(habit);
  
      // Solo actualiza si el streak ha cambiado
      if (habit.currentStreak !== newStreak) {
        return { ...habit, currentStreak: newStreak };
      }
      return habit;
    });
  
    // Verificar si hay algún cambio en los hábitos antes de actualizar el estado
    const isStateChanged = updatedHabits.some(
      (updatedHabit, i) => updatedHabit.currentStreak !== habits[i].currentStreak
    );
  
    if (isStateChanged) {
      setHabits(updatedHabits); // Actualizar el estado global solo si hubo cambios
    }
  }, [setHabits]); // Removemos `habits` de las dependencias para evitar bucles  
    
  const renderHabit = ({ item, index }) => (
    <TouchableOpacity
      style={styles.habitContainer}
      onPress={() =>
        navigation.navigate('HabitsInfo', {
          habit: item,
          index,
          deleteHabit: () => deleteHabit(index), // Pasar la función de eliminar con índice
          editHabit: (updatedHabit) => editHabit(updatedHabit, index), // Pasar la función de edición con índice
        })
      }
    >
      <View style={styles.habitTextContainer}>
        <Text style={styles.habitTitle}>{item.name}</Text>
        <Text style={styles.habitDescription}>
          {item.description || 'Sin descripción'}
        </Text>
      </View>
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>{item.currentStreak || 0}</Text>
        <Text style={styles.streakLabel}>Streak</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hábitos</Text>
      </View>

      {/* Línea debajo del encabezado */}
      <View style={styles.divider} />

      {/* Lista de hábitos */}
      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.noHabitsText}>No hay hábitos creados</Text>
        )}
      />
      <AddButton onPress={() => navigation.navigate('AddCheckHabitScreen')} />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  habitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  habitTextContainer: { flex: 1 },
  habitTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  habitDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  streakContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  streakText: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  streakLabel: { fontSize: 12, color: '#555', marginTop: 4 },
  noHabitsText: { textAlign: 'center', marginTop: 16, fontSize: 16, color: '#888' },
});

export default HabitsScreen;
