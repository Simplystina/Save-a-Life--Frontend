import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {resetState, verifyOTP} from "../../features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import Toast from "react-native-toast-message";

export default function OTPScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, success, error, user } = useSelector((state : RootState) => state.auth);
   useEffect(() => {
    console.log(success,"success")
    if (success) {
      console.log("We didn't get here");
      Toast.show({
        type: "success",
        text1: "OTP Verified Successful 🎉",
      });

      dispatch(resetState());
      setOtp(["", "", "", "", "", ""]);

      // Add a delay before navigating (e.g., 2 seconds)
      setTimeout(() => {
        router.replace("/(onboarding)/login");
      }, 2000); // 2000ms = 2 seconds
    }

  console.log(error,"checking the error")
    if (error) {
      console.log("We still got here")
      Toast.show({
        type: "error",
        text1: error,
      });
      setOtp(["", "", "", "", "", ""]);
      dispatch(resetState());
    }
  }, [success, error, dispatch]);

  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Handle input change
  const handleChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if not last box
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-hide keyboard if last box filled
    if (index === 5 && text) {
      Keyboard.dismiss();
    }
  };

  // Handle Backspace
  const handleBackspace = (index: number) => {
    if (index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  // Handle OTP verification
  const verifyOtp = () => {
    const enteredOTP = otp.join(""); // Convert array to string

    if (enteredOTP.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
      return;
    }

    console.log("Verifying OTP:", enteredOTP, user, user?.email);
    if(user?.email){
      dispatch(verifyOTP({ email: user.email, otp: enteredOTP }));
    }
    
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
      {/* OTP Verification Text & Inputs */}
      <View style={{ marginTop: 50 }}>
        <View>
          <TouchableOpacity className="" onPress={() => router.back()}>
            <Image
              className="flex object-cover m-0 p-0  w-20 h-10"
              source={require("@/assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
        </View>
        <Text
          className="font-euclidMedium text-center"
          style={{ fontSize: 20, marginBottom: 10 }}
        >
          OTP Verification
        </Text>
        <Text
          className="font-euclid"
          style={{ color: "gray", marginBottom: 20, textAlign: "center" }}
        >
          Enter the 6-digit code sent to {user?.email}
        </Text>

        {/* OTP Input Boxes */}
        <View className="mt-20" style={{ flexDirection: "row", gap: 10 }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                width: 50,
                height: 50,
                textAlign: "center",
                fontSize: 20,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "red",
              }}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>
      </View>

      {/* Verify OTP Button */}
      <View>
        <LinearGradient
          colors={["#DC110A", "#C30D02"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-lg w-full"
        >
          <TouchableOpacity
            onPress={verifyOtp}
            className="py-3 w-full items-center"
          >
            <Text className="text-white text-lg font-euclidMedium">
              Verify OTP
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Resend OTP */}
        <TouchableOpacity
          onPress={() => console.log("Resend OTP")}
          style={{ marginTop: 15, alignSelf: "center" }}
        >
          <Text style={{ color: "#DC110A", fontWeight: "bold" }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}
