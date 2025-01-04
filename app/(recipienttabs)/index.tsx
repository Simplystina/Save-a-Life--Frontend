import { Image, StyleSheet, Platform, Text } from 'react-native';
import React ,{useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native';
import TabLayout from './_layout';
 

export default function HomeScreen() {
  const [isDonor, setIsDonor] = useState(true);
  return (
   <ScrollView>
    <Text>Homeeeeeeeeeeeeeeee</Text>

   </ScrollView>

  );
}

const styles = StyleSheet.create({
});
