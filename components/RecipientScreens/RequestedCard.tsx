import {
  Image,
  StyleSheet,
  Platform,
  Text,
  Switch,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const RequestCard = () => {

  const stateColors = {
    pending: "#FFDE00", // Yellow
    accepted: "#4CAF50", // Green
    rejected: "#F44336", // Red
    cancelled: "#9E9E9E", // Grey
    matched: "#2196F3", // Blue
    // Add other states and their colors as needed
  };
  const router = useRouter();
  const id = 3;
   const backgroundColor = stateColors["pending"] || "#FFFFFF";
  return (
    <Pressable onPress={() => router.push(`/recipientrequestscreen/[id]`)}>
      <View
        className="border-[2px] border-[#E8EAED] p-4 mt-6"
        style={{
          shadowColor: "#0517309e", // Shadow color (iOS)
          shadowOffset: { width: 0, height: 4 }, // Offset for shadow (iOS)
          shadowRadius: 30, // Blur radius for shadow (iOS)
          shadowOpacity: 1, // Opacity for shadow (iOS)
          elevation: 10, // Elevation for shadow (Android)
        }}
      >
        <View className="flex flex-row items-center justify-between p-4 border-b-[4px] border-b-[#E8EAED]">
          <Text className="font-euclidBold text-[#0E0E0E] text-[18px] font-[600] mr-2">
            Request Status :
          </Text>
          <View className="p-3 rounded-2xl bg-[#FFDE00]">
            <Text className="font-euclidBold">pending</Text>
          </View>
        </View>
        <View className="flex flex-row  justify-between p-4">
          <View className="flex flex-col space-y-2 w-2/4 ">
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Patient Name:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Patient Age:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Physician Name:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Hospital Address:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Date of Request:
            </Text>
          </View>
          <View className="flex flex-col space-y-2 w-2/4 ">
            <Text className="text-left  font-euclidBold text-[15px] font-[600]">
              Ahmad Sharma
            </Text>
            <Text className="text-left  font-euclidBold text-[15px] font-[600]">
              16 years old
            </Text>
            <Text className="text-left  font-euclidBold text-[15px] font-[600]">
              Dr. Harry Singh
            </Text>
            <Text className="text-left  font-euclidBold text-[15px] font-[600]">
              15, Local street, off Sango, Surulere, Lagos.
            </Text>
            <Text className="text-left  font-euclidBold text-[15px] font-[600]">
              7th February 2024
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/recipientrequestscreen/[id]`)}
          className="bg-[#008000] border-2 p-4 border-[#23C223] rounded-[10px] shadow-md shadow-[#DAE1EB9E] flex justify-center items-center"
        >
          <Text className="font-euclid text-center text-white">
            Click to View
          </Text>
        </TouchableOpacity>
        {/* <View className="flex flex-row justify-between gap-4 items-center p-4">
          <TouchableOpacity
            style={{
              shadowColor: "#DAE1EB9E", // Shadow color
              shadowOffset: { width: 0, height: 4 }, // Shadow offset
              shadowOpacity: 0.5, // Shadow opacity
              shadowRadius: 30, // Shadow blur radius
              elevation: 10, // Shadow for Android
            }}
            className="w-[156px] h-[43px] bg-[#008000] border-2 border-[#23C223] rounded-[10px] shadow-md shadow-[#DAE1EB9E] flex justify-center items-center"
          >
            <Text className="text-white text-[16px] font-bold">
              Mark donation as Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#DAE1EB9E", // Shadow color
              shadowOffset: { width: 0, height: 4 }, // Shadow offset
              shadowOpacity: 0.5, // Shadow opacity
              shadowRadius: 30, // Shadow blur radius
              elevation: 10, // Shadow for Android
            }}
            className="w-[156px] h-[43px] bg-[#FFFFF] border-2 border-[#F64F49] rounded-[10px] shadow-md shadow-[#DAE1EB9E] flex justify-center items-center"
          >
            <Text className="text-[#C30D02] font-euclidSemiBold text-[16px] font-bold">
              Cancel Blood Request
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </Pressable>
  );
};

export default RequestCard;

const styles = StyleSheet.create({});
