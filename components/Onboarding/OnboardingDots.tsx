import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through screens
  };
 

  return (
    <View style={styles.container}>
      {/* Dot Indicators */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((index) =>
          activeIndex === index ? (
            <LinearGradient
              key={index}
              colors={["#DC110A", "#C30D02"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.dot, styles.activeDot]}
            />
          ) : (
            <View key={index} style={styles.dot} />
          )
        )}
      </View>

      {/* Continue Button */}
      <LinearGradient
        colors={["#DC110A", "#C30D02"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonContainer}
      >
        <TouchableOpacity style={styles.buttonContent} onPress={handleNext}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 30, // Elongated dot dimensions
    height: 10,
    borderRadius: 5,
  },

  buttonContainer: {
    width: 361, // Fixed width
    borderRadius: 20,
    shadowColor: "#808DA19E",
    shadowOffset: { width: 12, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 5, // For Android shadow
    boxShadow:"0px 4px 10px 0px #808DA19E", // For iOS shadow
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 16, // Adjust font size as needed
    fontWeight: "600", // Semi-bold text
    color: "#FFF", // Text color
  },
});
