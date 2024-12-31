import { SafeAreaView, StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
//import bloodImage from "@/assets/images/blood.png"
import SplashScreen  from "@/components/Onboarding/SplashScreen";
import OnboardingDots from '@/components/Onboarding/OnboardingDots';
import { useRouter } from 'expo-router';
export const OnboardingScreen = () => {
  const [isAppReady, setIsAppReady] = useState(true);///change this later
   const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter()
   const handleNext = () => {
    if (activeIndex === 2) {
       router.push('/Signup')
       setActiveIndex(0)
    }
     setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through screens
   };
   const handlePrev = ()=>{
    setActiveIndex((prevIndex) => (prevIndex - 1) % 3); // Cycle through screens
   }
   const onboardingData = [
     {
       id: 0,
       title: "Saving Lives at Your Fingertips",
       description:
         " With real-time donor matching and easy scheduling, you can help save lives anytime, anywhere.",
     },
     {
       id: 1,
       title: "Find Nearby Donors Instantly",
       description:
         "Quickly locate and connect with donors in your area, ensuring timely help when it’s needed most.",
     },
     {
       id: 2,
       title: "Stay Informed and In Control",
       description: "Stay informed about your blood status and easily manage your donations",
     },
   ];
  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);

    }, 1000); 
  }, []);
  return (
    <>
      <SafeAreaView className="w-full pr-5 pl-5 mt-20 pb-0">
        {isAppReady ? (
          <>
            <View className=" flex w-full h-[65%]">
              <View className="flex-row h-full  w-full mt-10 space-x-5">
                <Image
                  className="h-full w-[50%] object-cover rounded-[20px]"
                  source={require("@/assets/images/Rectangle3.png")}
                />

                <View className="flex-1 flex-col justify-between w-[50%]">
                  <Image
                    className="h-[48%] w-full object-cover rounded-[20px]"
                    source={require("@/assets/images/Rectangle1.png")}
                  />
                  <Image
                    className="h-[48%] w-full object-cover rounded-[20px]"
                    source={require("@/assets/images/Rectangle2.png")}
                  />
                </View>
              </View>
              <View className="mt-10 justify-between">
                <Text className="font-euclid text-[28px] text-[#0E0E0E] font-[700] text-center pb-10">
                  {onboardingData[activeIndex].title}
                </Text>
                <Text className="font-euclid text-[#858585] text-[15px] font-[500] text-center">
                  {onboardingData[activeIndex].description}
                </Text>
              </View>
              <View className="mt-12 justify-center items-center">
                {/* Dot Indicators */}
                <View className="flex-row justify-center items-center mb-7">
                  {[0, 1, 2].map((index) =>
                    activeIndex === index ? (
                      <LinearGradient
                        key={index}
                        colors={["#DC110A", "#C30D02"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-[30px] h-[10px] rounded-[5px]"
                      />
                    ) : (
                      <View
                        key={index}
                        className="w-[10px] h-[10px] rounded-[5px] bg-[#ccc] mx-2"
                      />
                    )
                  )}
                </View>

                {/* Continue Button */}
                {activeIndex !== 1 && (
                  <LinearGradient
                    colors={["#DC110A", "#C30D02"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-[361px] rounded-[20px] shadow-[0px_4px_30px_#808DA19E] shadow-opacity-30 shadow-radius-30 shadow-color-[#808DA19E] elevation-5"
                  >
                    <TouchableOpacity
                      className="justify-center items-center py-4 px-5"
                      onPress={handleNext}
                    >
                      <Text className="text-white text-[16px] font-semibold">
                       {activeIndex === 0 ? "Get Started" : "Continue"}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
                {activeIndex === 1 && (
                  <View className="w-full flex justify-between flex-row">
                    <TouchableOpacity
                      className="justify-center items-center py-4 px-5"
                      onPress={handlePrev}
                    >
                      <Text className="text-[#858585] text-[15px] font-semibold">
                        Skip
                      </Text>
                    </TouchableOpacity>
                    <LinearGradient
                      colors={["#DC110A", "#C30D02"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="w-[100px] rounded-[10px] shadow-[0px_4px_30px_#808DA19E] shadow-opacity-30 shadow-radius-30 shadow-color-[#808DA19E] elevation-5"
                    >
                      <TouchableOpacity
                        className="justify-center items-center py-4 px-5"
                        onPress={handleNext}
                      >
                        <Text className="text-white text-[16px] font-semibold">
                          Next
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
              </View>
            </View>
          </>
        ) : (
          <SplashScreen />
        )}
      </SafeAreaView>
    </>
  );  
}

export default OnboardingScreen;

const styles = StyleSheet.create({})