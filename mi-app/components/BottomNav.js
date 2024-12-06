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
        <Text style={styles.navLabel}>Today</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Hábitos */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Habits')}
      >
        <Ionicons name="star" size={24} color="black" />
        <Text style={styles.navLabel}>Habits</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Planificador del Día (RemindersScreen) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Reminders')}
      >
        <Ionicons name="time" size={24} color="black" />
        <Text style={styles.navLabel}>Day Planner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default BottomNav;
