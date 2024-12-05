import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function RemindersScreen() {
  // Datos de ejemplo para la lista de tareas
  const tasks = [
    { hour: '9:00', title: 'Hacer tarea !!!', duration: '1 hora' },
    // Agrega más tareas si lo necesitas
  ];

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.hour}>{item.hour}</Text>
      <View>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDuration}>{`Duración: ${item.duration}`}⁠</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hoy</Text>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.noTasks}>No hay tareas programadas</Text>
        )}
      />

      {/* Botón flotante */}
      <TouchableOpacity style={styles.fab} onPress={() => alert('Agregar tarea')}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text style={styles.navLabel}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="star" size={24} color="black" />
          <Text style={styles.navLabel}>Habits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time" size={24} color="black" />
          <Text style={styles.navLabel}>Day Planner</Text>
        </TouchableOpacity>
      </View>
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
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#007BFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
  },
});

export default RemindersScreen;