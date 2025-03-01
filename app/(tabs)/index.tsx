import {
  Image,
  StyleSheet,
  Platform,
  Text,
  Switch,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import BloodRequestCard from "@/components/DonorScreens/BloodRequestCard";

export default function HomeScreen() {
  const router = useRouter();
  const [isDonor, setIsDonor] = useState(true);
  const toggleSwitch = () => {
    setIsDonor((prevState) => !prevState);
    router.push("/(recipienttabs)");
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Fixed Header */}
      <LinearGradient
        colors={["#DC110A", "#C30D02"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="sticky top-0 z-10 pt-20 pl-4 pr-4 h-[250px] rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between mt-4 relative">
          {/* Greeting Section */}
          <View className="flex-1">
            <Text className="text-[#E8EAED] font-euclidMedium text-sm">
              Hello 👋
            </Text>
            <Text className="text-[#F7F7F7] font-euclidBold text-lg">
              Oyindamola Jimoh
            </Text>
          </View>

          {/* Switch Section */}
          <View className="flex-shrink-0">
            <View className="flex-row items-center bg-gray-200 rounded-full p-1 max-w-xs w-44 relative">
              {/* Donor Text */}
              <Text
                className={`text-xs font-euclidSemiBold flex-1 text-center ${
                  isDonor ? "text-white" : "text-gray-700"
                }`}
              >
                Donor
              </Text>
              {/* Switch */}
              <TouchableOpacity
                onPress={toggleSwitch}
                className={`absolute w-20 h-8 rounded-full ${
                  isDonor ? "bg-red-500 left-1" : "bg-blue-500 right-1"
                } flex-row items-center p-1 transition-all duration-300`}
              >
                <View className="w-6 h-6 bg-white rounded-full" />
              </TouchableOpacity>
              {/* Recipient Text */}
              <Text
                className={`text-xs font-euclidSemiBold flex-1 text-center ${
                  !isDonor ? "text-white" : "text-gray-700"
                }`}
              >
                Donor
              </Text>
            </View>
          </View>

          <View
            style={[styles.card, styles.shadowProp]}
            className="rounded-[10px] mt-20 flex flex-row space-x-4 items-center"
          >
            <Image
              source={require("../../assets/images/Donate.png")}
              className="object-contain"
            />
            <View>
              <View className="">
                <Text className="font-euclidBold text-[15px] text-[#0E0E0E] font-[600]">
                  Last Donation Date
                </Text>
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={require("../../assets/images/calendar.png")}
                    className="object-contain"
                  />
                  <Text className="text-[#4C4C4C] font-euclid text-[14px]">
                    28th September 2023
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView className="mt-[40px]">
        <View className="flex-1 items-center justify-center p-4 mt-[0px]">
          <View className="flex-row justify-between w-full items-center mb-4 mt-4">
            <Text className="text-base font-euclidBold text-gray-700">
              Blood Request
            </Text>
            <Text className="font-euclidBold text-[15px] text-[#DC110A]">
              See all
            </Text>
          </View>
          <View>
            <BloodRequestCard />
            <BloodRequestCard />
            <BloodRequestCard />
            <BloodRequestCard />
            <BloodRequestCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: 300,
    height: 80,
    margin: "auto",
    position: "absolute",
    top: 40,
    left: 50,
    right: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
});
