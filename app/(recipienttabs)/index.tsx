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
  const [isRecipient, setIsRecipient] = useState(true);

  const toggleSwitch = () => {
    setIsRecipient((prevState) => !prevState);
    // You can navigate to a different layout or page after the switch
    // For example:
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        {/* Header */}
        <LinearGradient
          colors={["#DC110A", "#C30D02"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-20 pl-4 pr-4 h-[250px] rounded-b-3xl"
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
              <View className="flex-row items-center justify-between bg-gray-200 rounded-full p-1 max-w-xs w-48">
                {/* Donor Text */}
                <Text
                  className={`text-xs font-euclidSemiBold ${
                    isRecipient ? "text-white" : "text-gray-700"
                  }`}
                >
                  Donor
                </Text>

                {/* Switch */}
                <TouchableOpacity
                  onPress={toggleSwitch}
                  className={`w-20 h-8 rounded-full ${
                    isRecipient ? "bg-red-500" : "bg-blue-500"
                  } flex-row items-center ${
                    isRecipient ? "justify-start" : "justify-end"
                  } p-1 transition-all duration-300`}
                >
                  <View className="w-6 h-6 bg-white rounded-full" />
                </TouchableOpacity>

                {/* Recipient Text */}
                <Text
                  className={`text-xs font-euclidSemiBold ${
                    !isRecipient ? "text-white" : "text-gray-700"
                  }`}
                >
                  Recipient
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        {/* Content */}
        <View className=" p-4 mt-[] ">
          {/* Add more scrollable content below */}
          <View className=" mb-">
            <Text className="font-euclidBold text-[15px] text-[#0E0E0E] font-[600]">
              Quick Actions
            </Text>
            <View className="flex flex-row justify-between space-x-4 mt-4">
              {/* Donate Blood Box */}
              <TouchableOpacity onPress={toggleSwitch}>
                <View
                  style={[styles.shadowProp]}
                  className="bg-white shadow-lg rounded-[10px] p-10  flex flex-column"
                >
                  <Image
                    source={require("../../assets/images/Donate.png")}
                    className="object-contain"
                  />
                  <View>
                    <Text className="font-euclidBold text-[15px] text-[#0E0E0E] font-[600]">
                      Donate Blood
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Request Blood Box */}
              <TouchableOpacity onPress={()=>{router.push("/(recipienttabs)/bloodrequest")}}>
                <View
                  style={[styles.shadowProp]}
                  className="bg-white shadow-lg rounded-[10px] p-10 flex flex-column"
                >
                  <Image
                    source={require("../../assets/images/Donate.png")}
                    className="object-contain"
                  />
                  <View>
                    <Text className="font-euclidBold text-[15px] text-[#0E0E0E] font-[600]">
                      Request Blood
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
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
    shadowColor: "#808DA19E",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: 200,
    height: 80,
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
