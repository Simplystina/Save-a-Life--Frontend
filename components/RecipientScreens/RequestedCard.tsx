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
import { format } from "date-fns";

// Define TypeScript interface for the request data
interface RequestDataProps {
  requestData: {
    _id: string;
    recipientId: string;
    bloodType: string;
    isRequestForSelf: boolean;
    status: string;
    recipientName: string;
    hospitalName: string;
    hospitalLocation: string;
    hospitalStateOfResidence: string;
    doctorsName: string;
    age: number;
    reason: string;
    suggestedDonors: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
}

// Define the status colors type
type StateColors = {
  [key: string]: string;
};

const RequestCard: React.FC<RequestDataProps> = ({ requestData }) => {
  const router = useRouter();

  // Status colors mapping
  const stateColors: StateColors = {
    pending: "#FFDE00", // Yellow
    accepted: "#4CAF50", // Green
    rejected: "#F44336", // Red
    cancelled: "#9E9E9E", // Grey
    matched: "#2196F3", // Blue
    // Add other states and their colors as needed
  };

  

  // Extract properties with default values for safety
  const {
    _id, status, recipientName ,age,doctorsName, 
    hospitalName, hospitalLocation, hospitalStateOfResidence = "",
    createdAt , bloodType, 
  } = requestData;

  // Format the created date
  const formattedDate = (() => {
    try {
      return format(new Date(createdAt), "do MMMM yyyy");
    } catch (error) {
      return "Invalid date";
    }
  })();

  // Determine background color based on status
  const backgroundColor = stateColors[status.toLowerCase()] || "#FFFFFF";

  // Format hospital address
  const hospitalAddress = `${hospitalLocation}, ${hospitalStateOfResidence}`;

  return (
    <Pressable onPress={() => router.push(`/recipientrequestscreen/${_id}`)}>
      <View
        className="border-[2px] border-[#E8EAED] p-4 mt-6 mx-4 rounded-lg"
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
            Request Status:
          </Text>
          <View className="p-3 rounded-2xl" style={{ backgroundColor }}>
            <Text className="font-euclidBold">
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between p-4">
          <View className="flex flex-col space-y-2 w-2/5">
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Patient Name:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Patient Age:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Blood Type:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Physician Name:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Hospital Name:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Hospital Address:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Hospital State of Residence:
            </Text>
            <Text className="font-euclidMedium text-[#858585] text-[15px] font-[600]">
              Date of Request:
            </Text>
          </View>
          <View className="flex flex-col space-y-2 w-3/5">
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {recipientName}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {age} years old
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {bloodType}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {doctorsName}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {hospitalName}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600] flex-wrap">
              {hospitalAddress}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600] flex-wrap">
              {hospitalStateOfResidence}
            </Text>
            <Text className="text-left font-euclidBold text-[15px] font-[600]">
              {formattedDate}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/recipientrequestscreen/${_id}`)}
          className="bg-[#008000] border-2 p-4 border-[#23C223] rounded-[10px] shadow-md shadow-[#DAE1EB9E] flex justify-center items-center mt-2"
        >
          <Text className="font-euclid text-center text-white">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default RequestCard;

const styles = StyleSheet.create({});
