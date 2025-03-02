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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import BloodRequestCard from "@/components/DonorScreens/BloodRequestCard";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/AntDesign";
import RequestCard from "@/components/RecipientScreens/RequestedCard";
import { getRecipientRequests } from "@/features/requestSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Request = () => {
  const [activeTab, setActiveTab] = useState("All Request");
  const tabs = ["All Request", "Suggested", "Accepted"];
  const router = useRouter();

  // Redux setup
 const dispatch = useDispatch<AppDispatch>();
  const { recipientRequests, requestsStatus, error } = useSelector(
    (state : RootState) => state.request
  );

  // Fetch requests when component mounts
  useEffect(() => {
    dispatch(getRecipientRequests())
  }, [dispatch]);

  // Filter requests based on active tab
  const getFilteredRequests = () => {
    if (!recipientRequests) return [];

    switch (activeTab) {
      case "Suggested":
        return recipientRequests.filter(
          (request) => request.suggestedDonors.length > 0
        );
      case "Accepted":
        return recipientRequests.filter(
          (request) => request.status === "accepted"
        );
      case "All Request":
      default:
        return recipientRequests;
    }
  };

  const filteredRequests = getFilteredRequests();

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
          <View className="flex-row items-center justify-between relative">
            {/* Greeting Section */}
            <Pressable onPress={() => router.back()}>
              <View className="border-[1px] border-white rounded-[8px] w-10 h-10 flex items-center justify-center">
                <Icon name="left" size={24} color="white" />
              </View>
            </Pressable>
            <View className="flex-1">
              <Text className="text-[#E8EAED] text-center text-[18px] font-euclidMedium ">
                My Blood Requests
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
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
                  <View className="items-center py-2 px-2 rounded-lg bg-white border-2 border-[#0000000A]">
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
          {requestsStatus === "loading" && (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#DC110A" />
              <Text className="mt-4 text-gray-600 font-euclid">
                Loading your requests...
              </Text>
            </View>
          )}

          {requestsStatus === "failed" && (
            <View className="py-10 items-center justify-center">
              <Icon name="exclamationcircleo" size={40} color="#DC110A" />
              <Text className="mt-4 text-gray-600 font-euclid">
                {error || "Failed to load requests. Please try again."}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(getRecipientRequests())}
                className="mt-4 bg-[#DC110A] py-2 px-4 rounded-lg"
              >
                <Text className="text-white font-euclidMedium">Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {requestsStatus === "success" && filteredRequests.length === 0 && (
            <View className="py-10 items-center justify-center">
              <Icon name="inbox" size={40} color="#888" />
              <Text className="mt-4 text-gray-600 font-euclid text-center px-6">
                {activeTab === "All Request"
                  ? "You haven't made any blood requests yet."
                  : activeTab === "Suggested"
                  ? "No requests with suggested donors yet."
                  : "No accepted requests yet."}
              </Text>
            </View>
          )}

          {requestsStatus === "success" &&
            filteredRequests.length > 0 &&
            filteredRequests.map((request) => (
              <RequestCard key={request._id} requestData={request} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Request;

const styles = StyleSheet.create({});
