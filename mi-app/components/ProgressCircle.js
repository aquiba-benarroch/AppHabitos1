import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const ProgressCircle = ({ habits }) => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter(habit => habit.completed).length;
  const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  const percentage = Math.round(completionRate);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (completionRate / 100) * circumference;

  return (
    <View style={styles.progressCircleContainer}>
      <Svg height="120" width="120" viewBox="0 0 120 120" style={styles.progressCircle}>
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="lightgrey"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="blue"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          fill="none"
        />
      </Svg>
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  progressCircle: {
    transform: [{ rotate: '-90deg' }],
  },
  percentageText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProgressCircle;
