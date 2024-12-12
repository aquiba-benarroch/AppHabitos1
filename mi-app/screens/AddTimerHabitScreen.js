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

const AddTimerHabitScreen = ({ navigation, addHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [duration, setDuration] = useState("");

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSaveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert("Error", "El nombre del hábito no puede estar vacío.");
      return;
    }
    if (!selectedDays.length) {
      Alert.alert("Error", "Debes seleccionar al menos un día.");
      return;
    }
    if (!duration.trim() || isNaN(duration)) {
      Alert.alert("Error", "Por favor, ingresa una duración válida.");
      return;
    }

    const newHabit = {
      name: habitName,
      description,
      days: selectedDays.map((day) => day.toLowerCase()),
      duration: parseInt(duration, 10),
      type: "timer", // Tipo de hábito
      completed: false,
    };

    addHabit(newHabit); // Actualizar el estado global
    navigation.navigate("Home"); // Redirigir a Home
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

      <Text style={styles.label}>Días de la semana:</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
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
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Duración (en minutos):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 30"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveHabit}>
        <Text style={styles.saveButtonText}>Guardar hábito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  daysContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  dayButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dayButtonSelected: { backgroundColor: "#6200ee" },
  dayText: { color: "#000" },
  dayTextSelected: { color: "#fff" },
  saveButton: {
    backgroundColor: "#00cc00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddTimerHabitScreen;