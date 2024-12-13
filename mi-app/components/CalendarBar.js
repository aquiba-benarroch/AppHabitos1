// Componente CalendarBar.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const CalendarBar = ({ selectedDate, setSelectedDate }) => {
  const generateDaysArray = (daysCount) => {
    const daysArray = [];
    const today = new Date();
    for (let i = 0; i < daysCount; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      daysArray.push(day);
    }
    return daysArray;
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarContainer}>
            {generateDaysArray(14).map((day) => {
              const isSelected = day.toDateString() === selectedDate.toDateString();
              return (
                <TouchableOpacity
                  key={day.toISOString()}
                  style={[styles.dayItem, isSelected && styles.selectedDayItem]}
                  onPress={() => setSelectedDate(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {day.toLocaleString('es-ES', { weekday: 'short' }).toUpperCase()}
                  </Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                    {day.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    paddingVertical: 5, // Ajustado para ocupar menos espacio vertical
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, // Ajustado para ser cuadrado
    height: 60, // Ajustado para ser cuadrado
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  selectedDayItem: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedDayText: {
    color: '#fff',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
});

export default CalendarBar;