import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddCheckHabitScreen = ({ navigation, addHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'El nombre del hábito no puede estar vacío.');
      return;
    }
    if (!selectedDays.length) {
      Alert.alert('Error', 'Debes seleccionar al menos un día.');
      return;
    }
  
    const newHabit = {
      name: habitName,
      description,
      days: selectedDays.map((day) => day.toLowerCase()), // Convertir a minúsculas
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      completed: false,
    };
  
    addHabit(newHabit);
    navigation.navigate('Home', { showToday: true });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del hábito:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu hábito"
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={styles.label}>Descripción (opcional):</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe tu hábito"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Frecuencia:</Text>
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.dayButtonSelected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDays.includes(day) && styles.dayButtonTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Fecha de Inicio */}
      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Desde:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
          <Text>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* Fecha de Fin */}
      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Hasta:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
          <Text>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveHabit}>
        <Text style={styles.saveButtonText}>Guardar hábito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 },
  daysContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  dayButton: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, margin: 5 },
  dayButtonSelected: { backgroundColor: "#6200ee" },
  dayButtonText: { color: "#000" },
  dayButtonTextSelected: { color: "#fff" },
  dateRow: { flexDirection: "row", marginBottom: 15 },
  dateLabel: { fontSize: 16, flex: 1 },
  dateButton: { backgroundColor: "#f0e5ff", padding: 10, borderRadius: 5, flex: 2 },
  saveButton: { backgroundColor: "#00cc00", padding: 15, borderRadius: 5, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddCheckHabitScreen;