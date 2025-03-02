import {
  StyleSheet,
  Image,
  Platform,
  View,
  Pressable,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Collapsible from "@/components/Collapsible";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import { Share } from "react-native";
import { logout } from "@/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";

export default function Profile() {
  const router = useRouter();
  const [showReferralSection, setShowReferralSection] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector(
       (state: RootState) => state.auth
     );

 
  // Generate unique referral link
  const generateReferralLink = () => {
    const userId = "user123"; // Replace with actual user ID
    const baseUrl = "https://your-app-domain.com";
    return `${baseUrl}/register?referrer=${userId}`;
  };

  // Handle contact sharing
  const handleShareContact = async () => {
    try {
      const permission = await Contacts.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Please enable contacts permission");
        return;
      }

      const contacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        pageSize: 100,
      });

      const shareContent = {
        message: `Hey! I've found an amazing blood donation app that helps save lives. Join me in making a difference! ${generateReferralLink()}`,
        subject: "Join Our Blood Donation Community",
      };

      await Share.share(shareContent, {
        dialogTitle: "Invite Friends to Donate Blood",
        excludedActivityTypes: [
          "com.apple.UIKit.activity.PostToTwitter",
          "com.apple.UIKit.activity.PostToFlickr",
        ],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share invitation");
    }
  };

  // Handle WhatsApp sharing
  const handleWhatsAppShare = async () => {
    const message = `I'm part of a life-saving blood donation community! Join me in making a difference! ${generateReferralLink()}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);

      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          "WhatsApp Not Installed",
          "Please install WhatsApp to use this feature",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
    }
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          dispatch(logout());
          router.replace("/login"); // Navigate to login screen
        },
      },
    ]);
  };

  // Handle Facebook sharing
  const handleFacebookShare = async () => {
    const referralLink = generateReferralLink();
    // Facebook sharing through the app requires Facebook SDK integration
    // This is a simpler approach using the browser
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink
    )}`;

    try {
      const canOpen = await Linking.canOpenURL(facebookUrl);

      if (canOpen) {
        await Linking.openURL(facebookUrl);
      } else {
        // Fallback to generic share if Facebook app/browser sharing isn't available
        const shareContent = {
          message: `I'm part of a life-saving blood donation community! Join me in making a difference! ${referralLink}`,
          url: referralLink,
        };
        await Share.share(shareContent);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share to Facebook");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Profile Header Section */}
      <LinearGradient
        colors={["#DC110A", "#C30D02"]}
        start={{ x: 0.8, y: 0.6 }}
        end={{ x: 0.2, y: 1 }}
        className="pt-[60px] pb-[30px] px-4"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Pressable onPress={() => router.back()}>
            <View className="border-[1px] border-white rounded-[8px] w-10 h-10 flex items-center justify-center">
              <Icon name="left" size={24} color="white" />
            </View>
          </Pressable>

          <Text className="text-white text-center text-[18px] font-euclidMedium">
            Profile
          </Text>

          <Pressable onPress={handleLogout}>
            <View className="border-[1px] border-white rounded-[8px] w-10 h-10 flex items-center justify-center">
              <Icon name="logout" size={20} color="white" />
            </View>
          </Pressable>
        </View>

        {/* Profile Information */}
        <View className="items-center mb-4">
          <Image
            source={require("../../assets/images/profile.png")}
            className="w-24 h-24 rounded-full mb-3"
          />
          <Text className="font-euclidSemiBold text-center mb-1 text-[18px] text-white">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="font-euclid text-center text-[15px] text-white">
            {user?.email}
          </Text>
        </View>
      </LinearGradient>

      {/* Share Section */}
      <View className="px-4 pt-4">
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="font-euclidSemiBold text-xl text-center mb-4">
            Invite Others to Save Lives
          </Text>

          {/* Contact Sharing Button */}
          <Pressable
            onPress={handleShareContact}
            className="mb-3 bg-red-600 rounded-lg p-3 flex-row items-center justify-center"
          >
            <Icon name="addusergroup" size={20} color="white" />
            <Text className="font-euclid ml-2 text-white">
              Share with Contacts
            </Text>
          </Pressable>

          {/* Social Media Buttons */}
          <View className="flex-row justify-between gap-2">
            <Pressable
              onPress={handleWhatsAppShare}
              className="flex-1 bg-green-500 rounded-lg p-3 flex-row items-center justify-center"
            >
              <Icon name="message1" size={20} color="white" />
              <Text className="font-euclid ml-2 text-white">WhatsApp</Text>
            </Pressable>

            <Pressable
              onPress={handleFacebookShare}
              className="flex-1 bg-blue-800 rounded-lg p-3 flex-row items-center justify-center"
            >
              <Icon name="user" size={20} color="white" />
              <Text className="font-euclid ml-2 text-white">Facebook</Text>
            </Pressable>
          </View>
        </View>

        {/* Additional profile settings could go here */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Pressable className="py-3 flex-row items-center border-b border-gray-100">
            <Icon name="setting" size={20} color="#DC110A" />
            <Text className="font-euclid ml-3 text-gray-800">Settings</Text>
            <Icon
              name="right"
              size={16}
              color="gray"
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          <Pressable className="py-3 flex-row items-center border-b border-gray-100">
            <Icon name="hearto" size={20} color="#DC110A" />
            <Text className="font-euclid ml-3 text-gray-800">
              Donation History
            </Text>
            <Icon
              name="right"
              size={16}
              color="gray"
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          <Pressable className="py-3 flex-row items-center border-b border-gray-100">
            <Icon name="calendar" size={20} color="#DC110A" />
            <Text className="font-euclid ml-3 text-gray-800">
              Upcoming Donations
            </Text>
            <Icon
              name="right"
              size={16}
              color="gray"
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          <Pressable className="py-3 flex-row items-center">
            <Icon name="questioncircleo" size={20} color="#DC110A" />
            <Text className="font-euclid ml-3 text-gray-800">
              Help & Support
            </Text>
            <Icon
              name="right"
              size={16}
              color="gray"
              style={{ marginLeft: "auto" }}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
 