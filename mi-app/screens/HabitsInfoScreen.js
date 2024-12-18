import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from '../components/ProgressCircle';

const HabitsInfoScreen = ({ route, navigation }) => {
  const { habit, deleteHabit, editHabit, index } = route.params;
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const habitStartDate = new Date(habit.startDate);
    const habitEndDate = new Date(habit.endDate);
  
    const firstDayOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();
  
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear las horas de "hoy" para evitar problemas con la comparación
  
    const emptyDaysBefore = Array.from({ length: startDayOfWeek }, () => ({
      day: null,
      status: 'inactive',
    }));
  
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        i + 1
      );
      currentDate.setHours(0, 0, 0, 0); // Resetear la hora de currentDate
  
      const dayString = currentDate.toISOString().split('T')[0];
  
      const isWithinDateRange =
        currentDate >= habitStartDate && currentDate <= habitEndDate;
  
      const dayName = currentDate
        .toLocaleString('es-ES', { weekday: 'long' })
        .toLowerCase();
      const isHabitDay = habit.days
        ?.map((day) => day.toLowerCase())
        .includes(dayName);
  
      if (!isWithinDateRange || !isHabitDay) {
        return { day: i + 1, status: 'inactive' }; // Días fuera del rango
      }
  
      if (currentDate > today) {
        return { day: i + 1, status: 'future' }; // Días futuros en amarillo
      }
  
      if (currentDate.getTime() === today.getTime()) {
        return {
          day: i + 1,
          status: habit.completionHistory?.[dayString]
            ? 'completed' // Verde si se completó hoy
            : 'future', // Amarillo si no se ha completado todavía
        };
      }
  
      return {
        day: i + 1,
        status: habit.completionHistory?.[dayString]
          ? 'completed' // Verde si se completó
          : 'not_completed', // Rojo si no se completó en días pasados
      };
    });
  
    const totalDays = emptyDaysBefore.length + days.length;
    const emptyDaysAfter = Array.from(
      { length: 7 - (totalDays % 7 || 7) },
      () => ({ day: null, status: 'inactive' })
    );
  
    setCalendarDays([...emptyDaysBefore, ...days, ...emptyDaysAfter]);
  
  }, [habit, selectedMonth]);

  useEffect(() => {
    // Calcular el streak cuando los días del calendario se actualizan
    const streakStats = getStreakStats();
  
    // Solo actualiza si el streak ha cambiado
    if (habit.currentStreak !== streakStats.actualStreak) {
      editHabit({ ...habit, currentStreak: streakStats.actualStreak }, index);
    }
  }, [calendarDays]); // Solo depende de calendarDays
  
  const handlePreviousMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)
    );
  };

  // Cálculo de estadísticas de streak
  const getStreakStats = () => {
    let actualStreak = 0;
    let bestStreak = 0;
    let currentStreak = 0;
  
    calendarDays.forEach((day) => {
      if (day.status === 'completed') {
        currentStreak += 1;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
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

  const activeDays = calendarDays.filter(
    (day) =>
      day.status !== 'inactive' &&
      day.day !== null && // Ignora los días vacíos
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        day.day
      ) <= new Date() // Solo cuenta hasta el día actual
  );
  
  const progress = activeDays.length
    ? Math.round((completedDays / activeDays.length) * 100)
    : 0;
  
  const handleEditHabit = () => {
    navigation.navigate("AddCheckHabitScreen", {
      editingHabit: habit,   // Pasa el hábito actual
      index: route.params.index, // Pasa el índice del hábito en la lista
      editHabit,             // Pasa la función para editar hábito
    });
  };
  
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
            deleteHabit(habit.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{habit.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddCheckHabitScreen', { habit, editHabit })
            }
            style={styles.actionButton}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddCheckHabitScreen", {
                  editingHabit: habit,
                  index, // Pasamos el índice para identificar el hábito
                })
              }
              style={styles.actionButton}
            >
              <Ionicons name="pencil" size={24} color="#007AFF" />
            </TouchableOpacity>
          
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
          }).replace(/^./, (str) => str.toUpperCase())}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Days */}
      <View style={styles.headerRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.dayHeader}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <View
            key={index}
            style={[
              styles.day,
              day.status === 'completed' && styles.completedDay,
              day.status === 'not_completed' && styles.notCompletedDay,
              day.status === 'future' && styles.futureDay,
            ]}
          >
            {day.day && <Text style={styles.dayText}>{day.day}</Text>}
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
      <ProgressCircle progress={progress} />


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
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  month: { fontSize: 18, fontWeight: '600' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  dayHeader: { width: '14.285%', textAlign: 'center', fontWeight: 'bold', color: '#555' },
  calendar: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, justifyContent: 'center' },
  day: {
    width: '13%',
    aspectRatio: 1, // Mantener el cuadrado
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center', // Centrado horizontal
    borderRadius: 15, // Redondeado
    backgroundColor: '#f5f5f5',
    padding: 2, // Añadir un pequeño padding para evitar desbordes
  },
  dayText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14, // Ajustar el tamaño de la fuente
    textAlign: 'center',
    marginTop: -15, // Mueve ligeramente el número hacia arriba
  },   
  completedDay: { backgroundColor: 'green' },
  notCompletedDay: { backgroundColor: 'red' },
  futureDay: { backgroundColor: 'gray' },
  statsContainer: { marginTop: -25, alignItems: 'center' },
  stat: { fontSize: 16, marginVertical: 5 },
  progressText: { textAlign: 'center', marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default HabitsInfoScreen;