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
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import BloodRequestCard from "@/components/DonorScreens/BloodRequestCard";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { createBloodRequest, resetState } from "../../features/requestSlice";
import { RootState } from "@/redux/store";
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppDispatch } from "../../hooks/dispatch";

const request = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRequestForSelf, setisRequestForSelf] = useState(false);
  const [bloodType, setBloodType] = useState(null);
  const [open, setOpen] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);

  const bloodTypes = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  const showDateTimePicker = () => {
    setShow(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
    setShow(false);
  };

  const [form, setForm] = useState({
    recipientName: "",
    age: "",
    hospitalName: "",
    doctorsName: "",
    hospitalLocation: "",
    hospitalStateOfResidence: "",
    reason: "",
  });

  const isFormComplete = Object.values(form).every(
    (value) => value !== "" && value !== null
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, success, error, status } = useSelector(
    (state: RootState) => state.request
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestData: any = {
      ...form,
      bloodType: bloodType,
      isRequestForSelf: isRequestForSelf,
    };
    const resultAction = await dispatch(createBloodRequest(requestData));
  };

  useEffect(() => {
    if (status === "success") {
      Toast.show({
        type: "success",
        text1: "Blood Request Created Successfully🎉",
        position: "top",
      });
      setTimeout(() => {
        router.push("/(recipienttabs)");
        dispatch(resetState());
      }, 5000);
    }
    if (status === "failed") {
      Toast.show({
        type: "error",
        text1: error || "An error occurred",
        position: "top"
      });
    }
  }, [status]);

  return (
    <SafeAreaView className="flex-1">
      {/* Fixed Header */}
      <LinearGradient
        colors={["#DC110A", "#C30D02"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="sticky top-0 z-10 pt-20 pl-4 pr-4 h-[145px]"
      >
        <View className="flex-row items-center justify-between relative">
          <Pressable onPress={() => router.back()}>
            <View className="border-[1px] border-white rounded-[8px] w-10 h-10 flex items-center justify-center">
              <Icon name="left" size={24} color="white" />
            </View>
          </Pressable>
          <View className="flex-1">
            <Text className="text-[#E8EAED] text-center text-[18px] font-euclidMedium">
              Donation Request Details
            </Text>
          </View>
        </View>
      </LinearGradient>
      <Toast />
      {/* Scrollable Content */}
      <ScrollView className="mt-[10px]">
        <View className="px-6 py-4 bg-white">
          <Text className="text-lg font-euclidSemiBold mb-2">
            Who needs this blood donation?
          </Text>

          <View className="flex-row gap-4 mb-6">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                !isRequestForSelf ? "bg-red-500" : "bg-gray-300"
              }`}
              onPress={() => setisRequestForSelf(false)}
            >
              <Text className="text-white">Myself</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                isRequestForSelf ? "bg-red-500" : "bg-gray-300"
              }`}
              onPress={() => setisRequestForSelf(true)}
            >
              <Text className="text-white">Someone Else</Text>
            </TouchableOpacity>
          </View>

          {isRequestForSelf && (
            <>
              <Text className="font-euclidMedium text-lg">
                Recipient's Details
              </Text>
              <TextInput
                placeholder="Recipient's Name"
                className="border border-gray-300 rounded-lg my-2 px-4 py-3 bg-white"
                value={form.recipientName}
                onChangeText={(text) =>
                  setForm({ ...form, recipientName: text })
                }
              />
              <TextInput
                placeholder="Recipient's Age"
                className="border border-gray-300 bg-white rounded-lg p-3 my-2"
                value={form.age}
                onChangeText={(text) => setForm({ ...form, age: text })}
              />
              <DropDownPicker
                open={open}
                value={bloodType}
                items={bloodTypes}
                setOpen={setOpen}
                setValue={setBloodType}
                placeholder="Select Blood Type"
                style={{
                  borderColor: "#E8EAED",
                  borderWidth: 1,
                  zIndex: 1,
                }}
                dropDownContainerStyle={{
                  borderColor: "#E8EAED",
                  backgroundColor: "#ffffff",
                  zIndex: 9999,
                  position: "absolute",
                  width: "100%",
                }}
                placeholderStyle={{
                  color: "#858585",
                }}
                labelStyle={{
                  color: "#000",
                }}
              />
            </>
          )}

          <Text className="font-euclidMedium text-lg mt-3">
            Hospital's Details
          </Text>
          <TextInput
            placeholder="Hospital's Name"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.hospitalName}
            onChangeText={(text) => setForm({ ...form, hospitalName: text })}
          />
          <TextInput
            placeholder="Doctor's Name"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.doctorsName}
            onChangeText={(text) => setForm({ ...form, doctorsName: text })}
          />
          <TextInput
            placeholder="Hospital's Location"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.hospitalLocation}
            onChangeText={(text) =>
              setForm({ ...form, hospitalLocation: text })
            }
          />
          <TextInput
            placeholder="Hospital's State Of Residence"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.hospitalStateOfResidence}
            onChangeText={(text) =>
              setForm({ ...form, hospitalStateOfResidence: text })
            }
          />

          <Text className="font-euclidSemiBold text-lg mt-3">
            Reason for Blood
          </Text>
          <TextInput
            placeholder="Reason"
            className="border border-gray-300 rounded-lg p-3 my-2 bg-white"
            value={form.reason}
            onChangeText={(text) => setForm({ ...form, reason: text })}
          />

          <TouchableOpacity
            className={`p-4 rounded-lg items-center mt-5 ${
              isFormComplete ? "bg-[#008000]" : "bg-[#23C223]"
            }`}
            onPress={handleSubmit}
          >
            <View>
              {status === "loading" ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">
                  Request Donation
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <Toast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default request;
