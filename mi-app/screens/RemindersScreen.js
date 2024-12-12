import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function RemindersScreen({ reminders, deleteReminder }) {
  const navigation = useNavigation();
  
  // Renderizar cada recordatorio
  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() =>
          navigation.navigate('AddRem', { editingReminder: item, index })
        }
      >
        <Text style={styles.hour}>
          {item.time
            ? item.time.split(':').slice(0, 2).join(':') // Mostrar solo horas y minutos
            : 'Sin hora'}

        </Text>
        <View>
          <Text style={styles.taskTitle}>{item.name || 'Sin nombre'}</Text>
          <Text style={styles.taskDays}>
            {item.days && item.days.length > 0
              ? `Días: ${item.days.join(', ')}`
              : 'Sin días seleccionados'}
          </Text>

          <Text style={styles.taskDate}>
            {item.selectedDate
              ? `Fecha: ${new Date(item.selectedDate).toLocaleDateString()}`
              : 'Sin fecha'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteReminder(index)}
      >
        <Ionicons name="trash" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const handleDeleteReminder = (index) => {
    Alert.alert(
      "Eliminar Recordatorio",
      "¿Estás seguro de que deseas eliminar este recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteReminder(index),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recordatorios</Text>
      </View>

      <FlatList
        data={reminders} // Usar los recordatorios ya ordenados desde App.js
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.noTasks}>No hay recordatorios programados</Text>
        )}
      />

      <AddButton onPress={() => navigation.navigate('AddRem')} />

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },

  deleteButton: { padding: 5 },
  taskContent: { flex: 1 },
  hour: { fontSize: 18, marginRight: 16, fontWeight: 'bold', color: '#333' },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskDays: { fontSize: 14, color: '#666' },
  taskDate: { fontSize: 14, color: '#666' },
  noTasks: { textAlign: 'center', marginTop: 16, fontSize: 16, color: '#666' },

});

export default RemindersScreen;
