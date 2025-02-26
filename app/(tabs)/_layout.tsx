import { Tabs } from 'expo-router';
import React,{useEffect, useState} from 'react';
import { Platform, Image , View, Text} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#DC110A",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f8f9fa",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
            fontFamily: "font-euclid",
          },
          tabBarItemStyle: {
            paddingVertical: 8,
          },
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,

            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/home-active.png")
                    : require("../../assets/images/home-inactive.png")
                }
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#DC110A" : "#8e8e93",
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="request"
          options={{
            title: "Request",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/request-active.png")
                    : require("../../assets/images/request-inactive.png")
                }
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#DC110A" : "#8e8e93",
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="donation"
          options={{
            title: "Donation",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/donation-active.png")
                    : require("../../assets/images/donation-inactive.png")
                }
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#DC110A" : "#8e8e93",
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/profile-active.png")
                    : require("../../assets/images/profile-inactive.png")
                }
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#DC110A" : "#8e8e93",
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
