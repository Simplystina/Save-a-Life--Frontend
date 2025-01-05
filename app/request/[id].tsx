import { Pressable, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/AntDesign";
import { Shadow } from 'react-native-shadow-2';
import AcceptBloodRequest from '@/components/DonorScreens/SuccessModal';
import RejectBloodRequest  from '@/components/DonorScreens/RejectionModal';

const SingleRequest = () => {
  const router = useRouter();
  const [acceptedRequest, setAcceptedRequest] = useState(false);
  const [rejectedRequest, setRejectedRequest] = useState(false);

  return (
    <View className="flex flex-1">
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
              Blood Request
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View className="flex flex-1 justify-between pl-2 pr-2">
        <View
          className=" flex  border-b-[2px] border-b-[#E8EAED] p-4 mt-2"
          style={{
            shadowColor: "#DAE1EB9E", // Shadow color (iOS)
            shadowOffset: { width: 0, height: 4 }, // Offset for shadow (iOS)
            shadowRadius: 30, // Blur radius for shadow (iOS)
            shadowOpacity: 1, // Opacity for shadow (iOS)
            elevation: 10, // Elevation for shadow (Android)
          }}
        >
          <View className="flex flex-row items-center justify-between pt-2 pb-4 border-b-[4px] border-b-[#E8EAED]">
            <Shadow
              distance={30} // The blur distance
              startColor="#DAE1EB9E" // Shadow color
              offset={[0, 4]} // Horizontal and vertical offsets
            >
              <View className="mr-2 border-t-4 border-t-[#C30D02] rounded-[10px] bg-white w-[45px] h-[45px] flex justify-center items-center">
                <Text className="font-euclidBold text-[#0E0E0E] text-[18px] font-[600]">
                  O+
                </Text>
              </View>
            </Shadow>
            <Text className="font-euclid text-[15px] font-[400] leading-[20.25px] text-[#4C4C4C]  ">
              <Text className="font-euclidBold text-[#0E0E0E] space-x-2 ">
                Jimoh Oyindamola
              </Text>
              <Text className="m-2"> </Text>
              at Evergreen Hospital is requesting for blood
            </Text>
          </View>
          <View className="flex flex-row  justify-between p-4">
            <View className="flex flex-col space-y-2 w-2/4 ">
              <Text className=" font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Date of Request:
              </Text>
              <Text className="font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Patient Name:
              </Text>
              <Text className="font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Patient Age:
              </Text>
              <Text className="font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Blood Group:
              </Text>
              <Text className="font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Physician Name:
              </Text>
              <Text className="font-euclidMedium text-[#858585] text-[16px] font-[500]">
                Hospital address:
              </Text>
            </View>
            <View className="flex flex-col space-y-2 w-2/4 ">
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                16th August 2024
              </Text>
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                Ahmad Sharma
              </Text>
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                16 years old
              </Text>
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                O+
              </Text>
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                Dr. Harry Singh
              </Text>
              <Text className="text-left  font-euclidBold text-[16px] font-[600]">
                16, Local street, off Sango, Surulere, Lagos.
              </Text>
            </View>
          </View>
          <Text className="text-[#858585] text-[15px] font-euclidMedium mb-4">
            Reason For Blood
          </Text>
          <Text className="text-left  font-euclid text-[15px] font-[500] text-[#0E0E0E]">
            Lorem ipsum dolor sit amet consectetur. Diam at fermentum arcu
            penatibus. At elit neque imperdiet ac viverra id pharetra platea.
          </Text>
          <Text className="text-[#858585] text-[15px] font-euclidMedium mb-4">
            Hospital's contact information
          </Text>
          {acceptedRequest && (
            <View className="flex flex-row items-center pt-2 pb-4 rounded-md border-[2px] border-[#E8EAED]">
              <Shadow
                distance={30} // The blur distance
                startColor="#DAE1EB9E" // Shadow color
                offset={[0, 4]} // Horizontal and vertical offsets
              >
                <Image
                  source={require("../../assets/images/phone.png")}
                  className=""
                />
              </Shadow>
              <View>
                <Text className="font-euclidBold text-[15px] text-[#0E0E0E] space-x-2 ">
                  Evergreen Hospital
                </Text>
                <Text className="font-euclid text-[15px] font-[400] leading-[20.25px] text-[#4C4C4C]  ">
                  +2348102764658
                </Text>
              </View>
            </View>
          )}
        </View>

        {!(acceptedRequest || rejectedRequest) &&
            (
            <View className="flex  flex-row justify-between gap-4 items-center p-4">
              <AcceptBloodRequest setAcceptedRequest={setAcceptedRequest} />
              <RejectBloodRequest setRejectedRequest={setRejectedRequest} />
            </View>
          )}
        {rejectedRequest && (
          <View className="w-full p-4">
            <TouchableWithoutFeedback
              style={{
                shadowColor: "#808DA19E", // Shadow color
                shadowOffset: { width: 0, height: 4 }, // Shadow offset
                shadowOpacity: 0.5, // Shadow opacity
                shadowRadius: 30, // Shadow blur radius
                elevation: 10, // Shadow for Android
              }}
            >
              <LinearGradient
                colors={["#DC110A", "#C30D02"]}
                start={{ x: 0.05, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  height: 53,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text className="text-white font-euclid">
                  {" "}
                  Request has been rejected
                </Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
}

export default SingleRequest;

const styles = StyleSheet.create({})