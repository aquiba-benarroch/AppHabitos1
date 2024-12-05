import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HabitList from '../components/HabitList';

function AddCheckHabitScreen() {
  const navigation = useNavigation();
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del habito:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu habito"
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={styles.label}>Descripción (opcional):</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe tu habito"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Frecuencia:</Text>
      <View style={styles.daysContainer}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayItem}>
            <TouchableOpacity onPress={() => toggleDay(day)} style={styles.checkboxPlaceholder}>
              <Text style={selectedDays.includes(day) ? styles.checkedBox : styles.uncheckedBox}>✓</Text>
            </TouchableOpacity>
            <Text>{day}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.label}>Duración:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}

    <TouchableOpacity style={styles.saveButton} onPress={() => {
    navigation.navigate('Home', {
        newHabit: {
        name: habitName,
        description: description,
        days: selectedDays,
        startDate: startDate,
        completed: false,
        },
    });
    }}>
    <Text style={styles.saveButtonText}>Guardar habito</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e0f7e8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#f0e5ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCheckHabitScreen;
