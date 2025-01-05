import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import  Icon  from 'react-native-vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import DonationCard from '@/components/DonorScreens/DonationCard'

const donation = () => {
  const router = useRouter();
  return (
    <View>
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
             Blood Donation History
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View className="p-4 w-full ">
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </View>
    </View>
  );
}

export default donation



const styles = StyleSheet.create({})