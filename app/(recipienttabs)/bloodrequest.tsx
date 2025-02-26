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
  TextInput
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import BloodRequestCard from "@/components/DonorScreens/BloodRequestCard";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const request = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isForSomeoneElse, setIsForSomeoneElse] = useState(false)

  const showDateTimePicker = () => {
    setShow(true);
  };
  
  // Handle DatePicker value change
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    console.log(show, "showwww");
    setDateOfBirth(currentDate);
    setShow(false);
  };


  const [form, setForm] = useState({
    recipientName: "",
    recipientAge: "",
    bloodType: "",
    hospitalName: "",
    physicianName: "",
    hospitalLocation: "",
    hospitalPhone: "",
    requestDate: "",
    reason: "",
  });

   const isFormComplete = Object.values(form).every(
     (value) => value !== "" && value !== null
   );
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
                Donation Request Details
              </Text>
            </View>
          </View>
        </LinearGradient>
        {/* Content */}
        <View className="px-6 py-4">
          <Text className="text-lg font-euclidSemiBold mb-2">
            Who needs this blood donation?
          </Text>
          <View className="flex-row gap-4 mb-6">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                !isForSomeoneElse ? "bg-red-500" : "bg-gray-300"
              }`}
              onPress={() => setIsForSomeoneElse(false)}
            >
              <Text className="text-white">Myself</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                isForSomeoneElse ? "bg-red-500" : "bg-gray-300"
              }`}
              onPress={() => setIsForSomeoneElse(true)}
            >
              <Text className="text-white">Someone Else</Text>
            </TouchableOpacity>
          </View>
          {/* Recipient's Details */}/
          {isForSomeoneElse && (
            <>
              <Text className="font-euclidMedium text-lg">
                Recipient’s Details
              </Text>
              <TextInput
                placeholder="Recipient’s Name"
                className="border border-gray-300 rounded-lg my-2 px-4 py-3 bg-white"
                value={form.recipientName}
                onChangeText={(text) =>
                  setForm({ ...form, recipientName: text })
                }
              />
              <View className="flex-row justify-between space-x-2">
                <TextInput
                  placeholder="Recipient’s Age"
                  className="border border-gray-300 rounded-lg p-3 my-2 bg-white w-1/2"
                  value={form.recipientAge}
                  onChangeText={(text) =>
                    setForm({ ...form, recipientAge: text })
                  }
                />
                <TextInput
                  placeholder="Blood Type"
                  className="border border-gray-300 rounded-lg p-3 my-2 bg-white w-1/2"
                  value={form.bloodType}
                  onChangeText={(text) => setForm({ ...form, bloodType: text })}
                />
              </View>
            </>
          )}
          {/* Hospital's Details */}
          <Text className="font-euclidMedium text-lg mt-3">
            Hospital’s Details
          </Text>
          <TextInput
            placeholder="Hospital’s Name"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.hospitalName}
            onChangeText={(text) => setForm({ ...form, hospitalName: text })}
          />
          <TextInput
            placeholder="Doctor’s Name"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.physicianName}
            onChangeText={(text) => setForm({ ...form, physicianName: text })}
          />
          <TextInput
            placeholder="Hospital’s Location"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.hospitalLocation}
            onChangeText={(text) =>
              setForm({ ...form, hospitalLocation: text })
            }
          />
          {/* <TextInput
            placeholder="Hospital Phone No"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white w-1/2"
            value={form.hospitalPhone}
            onChangeText={(text) => setForm({ ...form, hospitalPhone: text })}
          /> */}
          {/* Reason for Blood */}
          <Text className="font-euclidSemiBold text-lg mt-3">
            Reason for Blood
          </Text>
          <TextInput
            placeholder="Reason"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.reason}
            onChangeText={(text) => setForm({ ...form, reason: text })}
          />
          {/* Submit Button */}
          {/* <TouchableOpacity className="bg-green-500 p-4 rounded-lg items-center mt-5">
            <Text className="font-euclidMedium text-white text-lg">
              Request Donation
            </Text>
          </TouchableOpacity>{" "} */}
          <TouchableOpacity
            className={`p-4 rounded-lg items-center mt-5 ${
              isFormComplete ? "bg-[#008000]" : "bg-[#23C223]"
            }`}
            disabled={!isFormComplete}
          >
            <Text className="text-white text-lg font-bold">
              Request Donation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default request;

const styles = StyleSheet.create({});
