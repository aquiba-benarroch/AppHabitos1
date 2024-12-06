import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import AddButton from '../components/AddButton';
import AddRemScreen from './AddRemScreen';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
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