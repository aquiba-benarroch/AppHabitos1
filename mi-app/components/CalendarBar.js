import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Ancho de la pantalla
const DAYS_PER_PAGE = 7; // Número de días por pantalla
const MAX_WEEKS_BEFORE = 2; // Máximo semanas hacia atrás
const MAX_WEEKS_AFTER = 6; // Máximo semanas hacia adelante

const CalendarBar = ({ selectedDate, setSelectedDate }) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayDays, setDisplayDays] = useState([]); // Array dinámico para días

  useEffect(() => {
    const today = new Date();
    const days = [];

    // Generar días en el rango definido
    const totalDays =
      DAYS_PER_PAGE * (MAX_WEEKS_BEFORE + MAX_WEEKS_AFTER + 1); // Total días requeridos para llenar todas las semanas

    for (let i = -DAYS_PER_PAGE * MAX_WEEKS_BEFORE; i < totalDays; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }

    // Asegurar que el número de días sea múltiplo de `DAYS_PER_PAGE`
    while (days.length % DAYS_PER_PAGE !== 0) {
      const lastDay = days[days.length - 1];
      const nextDay = new Date(lastDay);
      nextDay.setDate(lastDay.getDate() + 1);
      days.push(nextDay);
    }

    setDisplayDays(days);

    // Mover al día actual al iniciar
    const todayIndex = days.findIndex((day) => day.toDateString() === today.toDateString());
    if (todayIndex !== -1) {
      const initialPage = Math.floor(todayIndex / DAYS_PER_PAGE);
      setCurrentPage(initialPage);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: initialPage * width,
          animated: false,
        });
      }, 100);
    }
  }, []);

  const handleScroll = (event) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);

    // Seleccionar automáticamente el primer día de la nueva página
    const firstDayOfPage = getDaysForPage(pageIndex)[0];
    if (firstDayOfPage) {
      setSelectedDate(firstDayOfPage);
    }
  };

  const getDaysForPage = (page) => {
    const startIndex = page * DAYS_PER_PAGE;
    return displayDays.slice(startIndex, startIndex + DAYS_PER_PAGE);
  };

  const getSelectedDayText = () => {
    const today = new Date();
    if (selectedDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    }

    const month = selectedDate
      .toLocaleString('es-ES', { month: 'long' })
      .replace(/^./, (char) => char.toUpperCase());

    return `${month} ${selectedDate.getDate()}`;
  };

  return (
    <View style={styles.container}>
      {/* Texto dinámico del día seleccionado */}
      <Text style={styles.selectedDayText}>{getSelectedDayText()}</Text>

      {/* Scroll de los días */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {Array.from({
          length: Math.ceil(displayDays.length / DAYS_PER_PAGE),
        }).map((_, pageIndex) => (
          <View key={pageIndex} style={styles.pageContainer}>
            {getDaysForPage(pageIndex).map((day) => {
              const isSelected = day.toDateString() === selectedDate.toDateString();
              return (
                <TouchableOpacity
                  key={day.toISOString()}
                  style={[styles.dayItem, isSelected && styles.selectedDayItem]}
                  onPress={() => setSelectedDate(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayTextInBox]}>
                    {day.toLocaleString('es-ES', { weekday: 'short' }).toUpperCase()}
                  </Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedDateTextInBox]}>
                    {day.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  selectedDayText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  scrollView: {
    flexGrow: 0,
  },
  pageContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / DAYS_PER_PAGE - 5, // Espacio dinámico para cada día
    height: 70,
    marginHorizontal: 2,
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
  selectedDayTextInBox: {
    color: '#fff',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateTextInBox: {
    color: '#fff',
  },
});

export default CalendarBar;
