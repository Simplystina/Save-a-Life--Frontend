import { StyleSheet, Image, Platform, View, Pressable, Text } from 'react-native';
import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter()
  return (
    <View>
      <LinearGradient
        colors={["#DC110A", "#C30D02"]}
        start={{ x: 0.8, y: 0.6 }}
        end={{ x: 0.2, y: 1 }}
        className="pt-[100px] pl-4 pr-4 h-[225px] "
      >
        <View className="flex-row justify-between">
          {/* Greeting Section */}
          <Pressable onPress={() => router.back()}>
            <View className="border-[1px] border-white rounded-[8px]  w-10 h-10 flex items-center justify-center">
              <Icon name="left" size={24} color="white" />
            </View>
          </Pressable>
          <View className="flex-1 ">
            <Text className="text-[#E8EAED] text-center text-[18px] font-euclidMedium ">
              Profile
            </Text>
            <Image
              source={require("../../assets/images/profile.png")}
              className="object-contain rounded-full mx-auto mt-2"
            />
            <Text className="font-euclidSemiBold text-center mb-2 text-[15px]">
              Jimoh Oyindamola
            </Text>
            <Text className="font-euclid text-center text-[15px]">
              jimohoyindamola@gmail.com
            </Text> 
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
