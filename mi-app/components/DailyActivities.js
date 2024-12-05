import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyActivities = ({ reminders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Actividades del día</Text>
      {/* Verifica que reminders esté definido y que sea un array antes de hacer map */}
      {reminders && reminders.length > 0 ? (
        reminders.map((reminder, index) => (
          <Text key={index} style={styles.reminderItem}>{reminder.name}</Text>
        ))
      ) : (
        <Text style={styles.noReminders}>No hay recordatorios para hoy.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow:1,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  reminderItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  noReminders: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default DailyActivities;
