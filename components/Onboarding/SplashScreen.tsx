import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={["#DC110A", "#C30D02"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("@/assets/images/blood.png")}
          className="w-20 h-20"
        />
        <Text className="text-white text-[38px] font-bold mt-4">Save A Life</Text>
      </View>
    </LinearGradient>
  );
}

export default SplashScreen