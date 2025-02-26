import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, {useState, useEffect } from 'react'
import { useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import Toast from "react-native-toast-message";
import { loginUser, resetState } from "@/features/authSlice";
import { Eye, EyeOff } from "lucide-react-native";

const login = () => {

   const [rememberMe, setRememberMe] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const { isLoading, success, error, loginSuccess } = useSelector(
    (state: RootState) => state.auth
  );
   const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(loginSuccess,"success", error, "checking the error");
    if (loginSuccess) {
      console.log("We didn't get here");
      Toast.show({
        type: "success",
        text1: "User LoggedIn Successfully 🎉",
      });
      
      setTimeout(() => {
        //router.replace("/(onboarding)/home");
        dispatch(resetState());
        router.push("/(tabs)");
      }, 2000);
    }
    console.log(error, "checking the error");
    if (error) {
      console.log("We still got here");
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch(resetState());
    }
  }, [loginSuccess, error, dispatch]);
  

      const [formData, setFormData] = useState({
        password: "",
        email: "",
      });
   
      const { email, password } = formData;
   
      const handleChange = (key: string, value: string) => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: value, // Use key instead of e.target.name
        }));
      };
      const handleSubmit = (e:any) => {
         router.push("/(tabs)");   
        //stop empty fields

        if (!(email && password)){
          return
        }
       console.log("submit button clicked")
        e.preventDefault();
        //dispatch(loginUser({ email, password}));
        
      };
  
  return (
    <View className="flex-1 bg-white px-6 py-4">
      {/* Header */}
      <View className=" relative w-full pt-10 pb-10">
        {/* Back Arrow */}
        <TouchableOpacity
          className="w-12 h-12 bg-white  flex items-center justify-center"
          style={{
            boxShadow: "0px 4px 30px 0px rgba(196, 208, 225, 0.62)",
          }}
          onPress={() => router.back()}
        >
          <Image
            className="absolutev left-1 flex object-contain m-0 p-0  w-13 h-10 rounded-full"
            source={require("@/assets/images/back-arrow.png")}
          />
        </TouchableOpacity>
      </View>

      <View className="flex justify-between flex-1">
        <View>
          <Text className="font-euclid text-[26px] font-[700] text-[#0E0E0E] mb-4">
            Welcome Back
          </Text>
          <Text className="text-[15px] text-[#4C4C4C] font-euclid font-[400] mb-4">
            Enter your registered account to log in
          </Text>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#858585"
            keyboardType="email-address"
            className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED]"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
          />
          <View className="bg-white px-4 py-3 rounded-lg mb-4 border border-[#E8EAED] flex-row items-center">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#858585"
              secureTextEntry={!showPassword}
              className="flex-1"
              onChangeText={(text) => handleChange("password", text)}
              value={formData.password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={20} color="#858585" />
              ) : (
                <EyeOff size={20} color="#858585" />
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between items-center ">
            {/* Remember Me */}
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Checkbox
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe(!rememberMe)}
                color="#C30D02" // Custom color for the checkbox
              />
              <Text className="font-euclid ml-2 text-[#858585] text-sm">
                Remember Me
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity>
              <Text className="text-[#F64F49] text-sm font-[600] font-euclid">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className="bg-red-600 rounded-md py-4 mt-6"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-center text-white text-lg font-medium font-euclid">
              Log in
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

export default login

const styles = StyleSheet.create({})