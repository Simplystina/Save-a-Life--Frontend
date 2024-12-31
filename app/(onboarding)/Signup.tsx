import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  NativeSyntheticEvent,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
 import { LinearGradient } from "expo-linear-gradient";
 import  DateTimePicker, {DateTimePickerEvent,} from "@react-native-community/datetimepicker";

import DropDownPicker from "react-native-dropdown-picker";
export default function Signup() {
  const [step, setStep] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

   //const [genotype, setGenotype] = useState<string>("");
  const [show, setShow] = useState(false);

  const [bloodGroup, setBloodGroup] = useState(null);
  const [open, setOpen] = useState(false);

  const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];
 const [genotype, setGenotype] = useState("");
 const [openGenotype, setOpenGenotype] = useState(false);

 const genotypes = [
   { label: "AA", value: "AA" },
   { label: "AS", value: "AS" },
   { label: "SS", value: "SS" },
   { label: "AC", value: "AC" },
 ];
 
  const [hasDonated, setHasDonated] = useState(null); // To track user's response (yes/no)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState(new Date());
 
   
 const showDateTimePicker = () => {
   setShow(true);
 };
const handleDonationResponse = (response:any) => {
  setHasDonated(response);
  if (response === "yes") {
    setShowDatePicker(true); // Show date picker if user donated blood
  } else {
    setShowDatePicker(false); // Hide date picker if user didn't donate
  }
};

const onDateChange = (event:any, selectedDate:any) => {
  const currentDate = selectedDate || lastDonationDate;
  setShowDatePicker(false);
  setLastDonationDate(currentDate);
};
 // Handle DatePicker value change
 const onChange = (event: any, selectedDate?: Date) => {
   const currentDate = selectedDate || dateOfBirth;
   console.log(show,"showwww")
   setShow(false);
   setDateOfBirth(currentDate);
 };
 
 
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-4">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center pt-10">
        {/* Back Arrow */}
        <TouchableOpacity className="" onPress={() => router.back()}>
          <Image
            className="flex object-cover m-0 p-0  w-20 h-10"
            source={require("@/assets/images/back-arrow.png")}
          />
        </TouchableOpacity>
        <Text className="text-sm text-gray-600 font-medium">
          Step {step} of 2
        </Text>
      </View>
      {/* Progress Bar */}

      <View className="w-full flex-row mt-4">
        <LinearGradient
          colors={step >= 1 ? ["#DC110A", "#C30D02"] : ["#F8CFCE", "#F8CFCE"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-2 flex-1 rounded-full"
        />
        <LinearGradient
          colors={step >= 2 ? ["#DC110A", "#C30D02"] : ["#F8CFCE", "#F8CFCE"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-2 flex-1 rounded-full ml-2"
        />
      </View>
      <View className="flex justify-between flex-1 ">
        {/* Form Section */}
        <View className="mt-8 ">
          {step === 1 ? (
            <>
              <Text className="font-euclid text-[26px] font-[700] text-[#0E0E0E] mb-4">
                Create Account
              </Text>
              <Text className="text-[15px] text-[#4C4C4C] font-euclid font-[400] mb-4">
                Kindly enter the details below to create an account
              </Text>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#858585"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#858585"
                keyboardType="email-address"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#858585"
                keyboardType="email-address"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
              />
              <View>
                <TextInput
                  value={dateOfBirth ? dateOfBirth.toDateString() : ""}
                  placeholder="Date of Birth"
                  placeholderTextColor="#858585"
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: "#E8EAED",
                  }}
                  //editable={false} // Make it non-editable, allowing only date picker selection
                  onPress={showDateTimePicker} // Show date picker when the user clicks the input field
                />

                {/* Show the DatePicker */}
                {show && (
                  <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"} // iOS uses a spinner, Android uses a default date picker
                    onChange={onChange} // Handle date change
                  />
                )}
              </View>
              <TextInput
                placeholder="State of Residence"
                placeholderTextColor="#858585"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
              />
            </>
          ) : (
            <>
              <Text className="font-euclid text-[26px] font-[700] text-[#0E0E0E] mb-4">
                Create Account
              </Text>
              <Text className="text-[15px] text-[#4C4C4C] font-euclid font-[400] mb-4">
                Kindly enter the details below to create an account
              </Text>
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="bg-white px-4 py-3 rounded-md mb-4 border  border-[#E8EAED]"
              />

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                className="bg-white px-4 py-3 rounded-md mb-4 border  border-[#E8EAED]"
              />
              <View
                className="mb-4"
                style={{ backgroundColor: "#fff", padding: 0 }}
              >
                {/* <Text>Select Blood Group</Text> */}
                <DropDownPicker
                  open={open}
                  value={bloodGroup}
                  items={bloodGroups}
                  setOpen={setOpen}
                  setValue={setBloodGroup}
                  placeholder="Select Blood Group"
                  style={{
                    borderColor: "#E8EAED",
                    borderWidth: 1,
                    zIndex: 1, // Ensure input field is above the dropdown
                  }}
                  dropDownContainerStyle={{
                    borderColor: "#E8EAED",
                    backgroundColor: "#ffffff",
                    zIndex: 9999, // Ensure dropdown appears on top
                    position: "absolute", // Ensure dropdown floats above other fields
                    width: "100%", // Ensure it matches the width of the input field
                  }}
                  placeholderStyle={{
                    color: "#858585",
                  }}
                  labelStyle={{
                    color: "#000",
                  }}
                />
              </View>
              <View className="bg-white mb-4">
                <DropDownPicker
                  open={openGenotype}
                  value={genotype}
                  items={genotypes}
                  setOpen={setOpenGenotype}
                  setValue={setGenotype}
                  placeholder="Select Genotype"
                  style={{
                    borderColor: "#E8EAED",
                    borderWidth: 1,
                    zIndex: 1, // Ensure input field is above the dropdown
                  }}
                  dropDownContainerStyle={{
                    borderColor: "#E8EAED",
                    backgroundColor: "#ffffff",
                    zIndex: 9999, // Ensure dropdown appears on top
                    position: "absolute", // Ensure dropdown floats above other fields
                    width: "100%", // Ensure it matches the width of the input field
                  }}
                  textStyle={{
                    color: "#000",
                  }}
                  labelStyle={{
                    color: "#000",
                  }}
                  placeholderStyle={{
                    color: "#858585",
                  }}
                />
              </View>
              <View className="p-4 bg-white">
      {/* Ask if user has donated blood */}
      <Text className="mb-4">Have you donated blood before?</Text>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => handleDonationResponse('yes')}>
          <Text className="text-blue-500">Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDonationResponse('no')}>
          <Text className="text-blue-500">No</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally show "Last Date of Blood Donation" field */}
      {hasDonated === 'yes' && (
        <View className="mt-4">
          <Text className="mb-2">Last Date of Blood Donation</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-white px-4 py-3 rounded-lg border border-[#E8EAED]">
            <Text className="text-black">
              {lastDonationDate ? lastDonationDate.toLocaleDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>

          {/* Show Date Picker if needed */}
          {showDatePicker && (
            <DateTimePicker
              value={lastDonationDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
      )}
    </View>
            </>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-red-600 rounded-md py-4 mt-6"
          onPress={() => {
            if (step === 1) {
              setStep(2);
            } else {
              router.push("/welcome"); // Navigate to a welcome screen
            }
          }}
        >
          <Text className="text-center text-white text-lg font-medium">
            {step === 1 ? "Next" : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
