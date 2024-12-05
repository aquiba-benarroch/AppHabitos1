import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MyHabits = ({ habits }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis hábitos</Text>
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitName}>
              <Text style={styles.bold}>{item.name}</Text> {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  habitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  habitName: {
    fontSize: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default MyHabits;
