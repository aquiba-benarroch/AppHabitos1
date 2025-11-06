import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function BottomNav() {
  const navigation = useNavigation(); // Obtiene la propiedad de navegación

  return (
    <View style={styles.bottomNav}>
      {/* Botón para ir a la pantalla de Hoy (HomeScreen) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="calendar" size={24} color="black" />
        <Text style={styles.navLabel}>Hoy</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Hábitos */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Habits')}
      >
        <Ionicons name="star" size={24} color="black" />
        <Text style={styles.navLabel}>Habitos</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Planificador del Día (RemindersScreen) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Reminders')}
      >
        <Ionicons name="time" size={24} color="black" />
        <Text style={styles.navLabel}>Recordatorios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center', // Cambié esto para centrar los elementos
    alignItems: 'center', // Esto asegura que los elementos estén alineados verticalmente
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    flex: 1, // Hace que los elementos ocupen espacio proporcionalmente
    alignItems: 'center',
    justifyContent: 'center', // Centra los elementos dentro de cada navItem
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default BottomNav;