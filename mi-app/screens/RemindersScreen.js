import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';
import { useNavigation } from '@react-navigation/native';

function RemindersScreen({ reminders }) {
  const navigation = useNavigation();

  const renderTask = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AddRem', { editingReminder: item, index })
      }
    >
      <View style={styles.taskContainer}>
        <Text style={styles.hour}>
          {item.time ? item.time.split(':').slice(0, 2).join(':') : 'Sin hora'}
        </Text>
        <View>
          <Text style={styles.taskTitle}>{item.name || 'Sin nombre'}</Text>
          <Text style={styles.taskDays}>
            {item.days && item.days.length > 0
              ? `Días: ${item.days.join(', ')}`
              : 'Sin días seleccionados'}
          </Text>
          <Text style={styles.taskDuration}>
            {item.startDate && item.endDate
              ? `Duración: ${item.startDate} - ${item.endDate}`
              : 'Duración no especificada'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recordatorios</Text>
      </View>

      {/* Lista de recordatorios */}
      <FlatList
        data={reminders || []} // Asegúrate de que reminders no sea null o undefined
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.noTasks}>No hay recordatorios programados</Text>
        )}
      />

      {/* Botón flotante */}
      <AddButton onPress={() => navigation.navigate('AddRem')} />

      {/* Barra de navegación inferior */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hour: {
    fontSize: 18,
    marginRight: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDays: {
    fontSize: 14,
    color: '#666',
  },
  taskDuration: {
    fontSize: 14,
    color: '#666',
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default RemindersScreen;