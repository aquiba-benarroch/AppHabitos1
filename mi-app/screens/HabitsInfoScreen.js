import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from '../components/ProgressCircle';
import BottomNav from '../components/BottomNav';

const HabitsInfoScreen = ({ route, navigation }) => {
  const { habit, deleteHabit, editHabit } = route.params; // Recibe el hábito, función para borrar y editar como parámetros
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  console.log('Habit:', habit);
  console.log('EditHabit:', editHabit);
  console.log('DeleteHabit:', deleteHabit);


  useEffect(() => {
    const habitStartDate = new Date(habit.startDate);
    const habitEndDate = new Date(habit.endDate);

    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        i + 1
      );

      const dayString = currentDate.toISOString().split('T')[0];
      const isWithinDateRange = currentDate >= habitStartDate && currentDate <= habitEndDate;

      const dayName = currentDate.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
      const isHabitDay = habit.days?.map((day) => day.toLowerCase()).includes(dayName);

      if (isWithinDateRange && isHabitDay) {
        return {
          day: i + 1,
          status: habit.completionHistory?.[dayString] ? 'completed' : 'not_completed',
        };
      }

      return {
        day: i + 1,
        status: 'inactive', // Días fuera del rango o frecuencia del hábito
      };
    });

    setCalendarDays(days);
  }, [habit, selectedMonth]);

  const handlePreviousMonth = () => {
    const prevMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() - 1,
      1
    );
    setSelectedMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );
    setSelectedMonth(nextMonth);
  };

  const getStreakStats = () => {
    let actualStreak = 0;
    let bestStreak = 0;
    let currentStreak = 0;

    calendarDays.forEach((day) => {
      if (day.status === 'completed') {
        currentStreak += 1;
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
      } else if (day.status === 'not_completed') {
        currentStreak = 0;
      }
    });

    actualStreak = currentStreak;

    return {
      completedDays: calendarDays.filter((day) => day.status === 'completed').length,
      actualStreak,
      bestStreak,
    };
  };

  const { completedDays, actualStreak, bestStreak } = getStreakStats();

  const handleDeleteHabit = () => {
    Alert.alert(
      'Eliminar hábito',
      '¿Estás seguro de que deseas eliminar este hábito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteHabit(habit.id); // Llama la función para borrar el hábito
            navigation.goBack(); // Regresa a la pantalla anterior
          },
        },
      ]
    );
  };

  const handleEditHabit = () => {
    navigation.navigate('AddCheckHabitScreen', { habit, editHabit });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{habit.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEditHabit} style={styles.actionButton}>
            <Ionicons name="pencil" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteHabit} style={styles.actionButton}>
            <Ionicons name="trash" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />

      {/* Calendar Navigation */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {selectedMonth.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
          })}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Days */}
      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <View
            key={index}
            style={[
              styles.day,
              day.status === 'completed' && styles.completedDay,
              day.status === 'not_completed' && styles.notCompletedDay,
              day.status === 'inactive' && styles.inactiveDay,
            ]}
          >
            <Text style={styles.dayText}>{day.day}</Text>
          </View>
        ))}
      </View>

      {/* Habit Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Best streak: {bestStreak} days</Text>
        <Text style={styles.stat}>Actual streak: {actualStreak} days</Text>
        <Text style={styles.stat}>Successful days: {completedDays} days</Text>
      </View>

      {/* Progress Circle */}
      <ProgressCircle progress={(completedDays / calendarDays.length) * 100} />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  actions: { flexDirection: 'row' },
  actionButton: { marginHorizontal: 10 },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  navButton: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  month: { fontSize: 18, fontWeight: '600' },
  calendar: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  day: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 15,
  },
  completedDay: { backgroundColor: 'green' },
  notCompletedDay: { backgroundColor: 'red' },
  inactiveDay: { backgroundColor: '#ccc' },
  dayText: { color: '#fff', fontWeight: 'bold' },
  statsContainer: { marginTop: 20, alignItems: 'center' },
  stat: { fontSize: 16, marginVertical: 5 },
});

export default HabitsInfoScreen;
