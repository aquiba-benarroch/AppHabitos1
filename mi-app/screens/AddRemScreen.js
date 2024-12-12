import React, { useState, useEffect } from "react";
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

const AddRemScreen = ({ navigation, route, addReminder, editReminder }) => {
  const [reminderName, setReminderName] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Validar fecha
  const validateDate = (date) =>
    date instanceof Date && !isNaN(date) ? date : new Date();

  // Validar hora
  const validateTime = (timeString) => {
    if (!timeString) return new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    const validTime = new Date();
    validTime.setHours(hours || 0, minutes || 0, 0, 0);
    return validTime;
  };

  useEffect(() => {
    if (route.params?.editingReminder) {
      const { name, time, days, selectedDate } = route.params.editingReminder;

      setReminderName(name || "");
      setSelectedDays(days || []);
      setTime(validateTime(time)); // Validar y configurar la hora
      setSelectedDate(selectedDate ? new Date(selectedDate) : new Date()); // Validar y configurar la fecha
    } else {
      // Valores predeterminados
      setReminderName("");
      setSelectedDays([]);
      setTime(new Date());
      setSelectedDate(new Date());
    }
  }, [route.params?.editingReminder]);

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
  
    const newReminder = {
      name: reminderName,
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }), // Asegura el formato correcto
      days: selectedDays,
      selectedDate: selectedDate.toISOString(),
    };
  
    if (route.params?.editingReminder) {
      editReminder(newReminder, route.params.index);
    } else {
      addReminder(newReminder);
    }
  
    navigation.navigate("Reminders");
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del recordatorio:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu recordatorio"
        value={reminderName}
        onChangeText={setReminderName}
      />

      <Text style={styles.label}>Hora:</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.timeBox}
      >
        <Text style={styles.timeText}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
            if (selectedTime) setTime(validateDate(selectedTime));
          }}
        />
      )}

      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateBox}
      >
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={validateDate(selectedDate)}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(validateDate(date));
          }}
        />
      )}

      <Text style={styles.label}>Frecuencia:</Text>
      <View style={styles.daysContainer}>
        {[
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ].map((day) => (
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
  dateBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  dateText: { fontSize: 18, textAlign: "center" },
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
  saveButton: {
    backgroundColor: "#00cc00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddRemScreen;
