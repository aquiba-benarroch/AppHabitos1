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

const AddRemScreen = ({ navigation, addReminder }) => {
  const [reminderName, setReminderName] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveReminder = () => {
    if (!reminderName.trim()) {
      Alert.alert("Error", "El nombre del recordatorio no puede estar vacío.");
      return;
    }

    addReminder({
      name: reminderName,
      time: time.toLocaleTimeString(),
      days: selectedDays,
      startDate,
      endDate,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del recordatorio:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre del recordatorio"
        value={reminderName}
        onChangeText={setReminderName}
      />

      <Text style={styles.label}>Hora:</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.timeBox}
      >
        <Text style={styles.timeText}>
          {time.getHours().toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

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

      <Text style={styles.label}>Duración:</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de inicio (yyyy-mm-dd)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de fin (yyyy-mm-dd)"
          value={endDate}
          onChangeText={setEndDate}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
        <Text style={styles.saveButtonText}>Guardar recordatorio</Text>
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
  timeBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  timeText: { fontSize: 18, textAlign: "center" },
  daysContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  dayButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#fff",
  },
  dayButtonSelected: { backgroundColor: "#6200ee" },
  dayButtonText: { color: "#000" },
  dayButtonTextSelected: { color: "#fff" },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#00cc00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddRemScreen;