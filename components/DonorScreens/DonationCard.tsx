import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DonationCard = () => {
  return (
    <View className="pt-4">
      <Text className="font-euclidBold text-[#0E0E0E] pb-2  text-[15px]">
        28th Sept, 2024
      </Text>
      <View className="flex flex-row items-center rounded-md justify-between p-4 border-[2px] border-[#E8EAED]">
        <View className="mr-4 border-t-4 border-t-[#C30D02] rounded-[10px] bg-white  w-[45px] h-[45px] flex justify-center items-center ">
          <Text className="font-euclidBold text-[#0E0E0E] text-[18px] font-[600]">
            O+
          </Text>
        </View>
        <View className="w-[80%]">
          <Text className="font-euclid text-[16px] font-[400] text-[#4C4C4C  space-x-2 ">
            You donated blood to
            <Text className="m-2"> </Text>
            <Text className="font-euclidBold text-[#0E0E0E] space-x-2 ">
              Jimoh Oyindamola
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DonationCard

const styles = StyleSheet.create({})