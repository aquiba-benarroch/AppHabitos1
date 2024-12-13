import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";

const ProgressCircle = ({ progress }) => {
  const radius = 40; // Radio del círculo
  const strokeWidth = 8; // Ancho del borde
  const circumference = 2 * Math.PI * radius; // Circunferencia
  const progressOffset = circumference - (progress / 100) * circumference; // Calcular el arco del progreso

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        {/* Círculo de fondo */}
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Círculo de progreso */}
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#007AFF"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Texto del porcentaje */}
      <Text style={styles.text}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default ProgressCircle;