import React, { useState, useEffect } from "react";
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
import { signUpUser, resetState } from "@/features/authSlice";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import Toast from 'react-native-toast-message';

export default function Signup() {
  const { isLoading, success, error } = useSelector((state : RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (success) {
      Toast.show({
        type: "success",
        text1: "Registration Successful 🎉",
       
      });
      dispatch(resetState());
      router.push("/(onboarding)/OTP");
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch(resetState());
      //router.replace("/(onboarding)/OTP")
    }
  }, [success, error, dispatch]);

  const [step, setStep] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

   //const [genotype, setGenotype] = useState<string>("");
  const [show, setShow] = useState(false);

  const [bloodType, setBloodType] = useState(null);
  const [open, setOpen] = useState(false);
   
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
   setDateOfBirth(currentDate);
   setShow(false);
 };
 
  const router = useRouter();

   const [formData, setFormData] = useState({
     firstName: "",
     lastName: "",
     email: "",
     password: "",
     confirmPassword: "",
     stateOfResidence: "",
     currentAddress :"" 
   });

   const { firstName, lastName, email, password, confirmPassword, currentAddress, stateOfResidence } = formData;

   const handleChange = (key: string, value: string) => {
     setFormData((prevState) => ({
       ...prevState,
       [key]: value, // Use key instead of e.target.name
     }));
   };
   const handleSubmit = (e:any) => {
    //router.push("/(onboarding)/OTP")
      if (step === 1) {
        setStep(2);
      } else {
        //router.push("/welcome"); 
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        dispatch(signUpUser({ firstName, lastName, email, password, currentAddress, stateOfResidence, dateOfBirth, lastDonationDate , bloodType}));
      }
   };
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
                onChangeText={(text) => handleChange("firstName", text)}
                value={formData.firstName}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#858585"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
                value={formData.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#858585"
                keyboardType="email-address"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
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
                value={formData.stateOfResidence}
                onChangeText={(text) => handleChange("stateOfResidence", text)}
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
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                className="bg-white px-4 py-3 rounded-md mb-4 border  border-[#E8EAED]"
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
              />
              <View
                className="mb-4"
                style={{ backgroundColor: "#fff", padding: 0 }}
              >
                {/* <Text>Select Blood Type</Text> */}
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
              {/* <View className="bg-white mb-4">
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
              </View> */}
              <TextInput
                placeholder="Address"
                placeholderTextColor="#858585"
                className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
                value={formData.currentAddress}
                onChangeText={(text) => handleChange("currentAddress", text)}
              />
              <View className="p-4 bg-white">
                {/* Ask if user has donated blood */}
                <Text className="mb-4">Have you donated blood before?</Text>
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    onPress={() => handleDonationResponse("yes")}
                  >
                    <Text className="text-blue-500">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDonationResponse("no")}
                  >
                    <Text className="text-blue-500">No</Text>
                  </TouchableOpacity>
                </View>

                {/* Conditionally show "Last Date of Blood Donation" field */}
                {hasDonated === "yes" && (
                  <View className="mt-4">
                    <Text className="mb-2">Last Date of Blood Donation</Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      className="bg-white px-4 py-3 rounded-lg border border-[#E8EAED]"
                    >
                      <Text className="text-black">
                        {lastDonationDate
                          ? lastDonationDate.toLocaleDateString()
                          : "Select Date"}
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
        <View>
          {step === 1 && (
            <TouchableOpacity
              className="bg-red-600 rounded-md py-4 mt-6 "
              onPress={handleSubmit}
            >
              <Text className="text-center text-white text-lg font-medium font-euclid">
                {step === 1 ? "Next" : "Create an Account"}
              </Text>
            </TouchableOpacity>
          )}
          {step === 2 && (
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="bg-white border border-red-600 rounded-md py-4 flex-1 mr-2"
                onPress={() => setStep(1)}
              >
                <Text className="text-center text-red-600 text-lg font-medium font-euclid">
                  Previous
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 rounded-md py-4 flex-1 ml-2"
                onPress={handleSubmit}
              >
                <Text className="text-center text-white text-lg font-medium font-euclid">
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="flex flex-row justify-center items-center py-4">
            <Text className="font-euclid font-[600] text-[#4C4C4C] text-sm">
              Already have an account?
            </Text>
            <Text
              onPress={() => router.push("/login")}
              className="font-euclid font-[700] text-[#DC110A] text-sm pl-2"
            >
              Log in
            </Text>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
}
