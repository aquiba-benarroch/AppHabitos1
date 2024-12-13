import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import BottomNav from '../components/BottomNav';

const HabitsInfoScreen = ({ route, navigation }) => {
  const { habit } = route.params; // Recibe el hábito como parámetro
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      status: habit.completedDates?.includes(`${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}-${i + 1}`) 
        ? 'completed'
        : 'not_completed',
    }));

    setCalendarDays(days);
  }, [habit.completedDates, selectedMonth]);

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
    const completedDays = calendarDays.filter(day => day.status === 'completed').length;
    const actualStreak = 5; // Hardcode streak logic, needs actual computation
    const bestStreak = 10; // Hardcode streak logic, needs actual computation

    return {
      completedDays,
      actualStreak,
      bestStreak,
    };
  };

  const { completedDays, actualStreak, bestStreak } = getStreakStats();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.name}</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
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
    backgroundColor: '#f0f0f0',
  },
  completedDay: { backgroundColor: 'green' },
  notCompletedDay: { backgroundColor: 'red' },
  dayText: { color: '#fff', fontWeight: 'bold' },
  statsContainer: { marginTop: 20, alignItems: 'center' },
  stat: { fontSize: 16, marginVertical: 5 },
});

export default HabitsInfoScreen;
