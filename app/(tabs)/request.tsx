import {
  Image,
  StyleSheet,
  Platform,
  Text,
  Switch,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import BloodRequestCard from "@/components/DonorScreens/BloodRequestCard";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/AntDesign";

const request = () => {
  const [activeTab, setActiveTab] = useState("All Request");

  const tabs = ["All Request", "Accepted", "Rejected"];

  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        {/* Header */}
        <LinearGradient
          colors={["#DC110A", "#C30D02"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-20 pl-4 pr-4 h-[145px] "
        >
          <View className="flex-row items-center justify-between  relative">
            {/* Greeting Section */}
            <Pressable onPress={() => router.back()}>
              <View className="border-[1px] border-white rounded-[8px]  w-10 h-10 flex items-center justify-center">
                <Icon name="left" size={24} color="white" />
              </View>
            </Pressable>
            <View className="flex-1">
              <Text className="text-[#E8EAED] text-center text-[18px] font-euclidMedium ">
                Blood Request
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View className="flex-row justify-around bg-gray-100 p-2 m-4 ">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 items-center py-3 rounded-lg  ${
                activeTab === tab
                  ? "bg-white border-2 border-[#0000000A]"
                  : "bg-gray-200"
              }`}
              onPress={() => setActiveTab(tab)}
            >
              {activeTab === tab ? (
                <Shadow
                  distance={3} // The blur distance
                  startColor="#B5B5B58A" // Starting color of the shadow
                  endColor="#00000000" // Ending color for a gradient shadow effect
                  offset={[0, 4]} // Horizontal and vertical shadow offsets
                >
                  <View className="items-center py-2 px-2 rounded-lg bg-white border-2  border-[#0000000A]">
                    <Text className="text-base text-[#0E0E0E] font-euclidBold">
                      {tab}
                    </Text>
                  </View>
                </Shadow>
              ) : (
                <View className="flex-1 items-center py-3 rounded-lg bg-gray-200">
                  <Text className="text-base font-euclid text-[#616161]">
                    {tab}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View className="">
          <BloodRequestCard />
          <BloodRequestCard />
          <BloodRequestCard />
          <BloodRequestCard />
          <BloodRequestCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default request;

const styles = StyleSheet.create({});
