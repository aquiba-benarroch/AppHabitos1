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
  const [showTimePicker, setShowTimePicker] = useState(false); // Agregado estado para showTimePicker
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    if (route.params?.editingReminder) {
      const { name, time, days, startDate, endDate } = route.params.editingReminder;
      setReminderName(name || "");
      setTime(new Date(`1970-01-01T${time || "00:00"}Z`));
      setSelectedDays(days || []);
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
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
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Cambia el formato de la hora
      days: selectedDays,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    };

    if (route.params?.editingReminder) {
      editReminder(newReminder, route.params.index);
    } else {
      addReminder(newReminder);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del hábito:</Text>
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
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
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
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={styles.dateInput}
        >
          <Text>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate instanceof Date && !isNaN(startDate) ? startDate : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
            }}
            />
        )}
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={styles.dateInput}
        >
          <Text>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate instanceof Date && !isNaN(endDate) ? endDate : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
            }}
            />
        )}
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
    alignItems: "center",
    justifyContent: "center",
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