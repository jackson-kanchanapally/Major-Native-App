import React, { useState, useEffect } from "react";
import { Link, Tabs } from 'expo-router';
import { NativeBaseProvider } from "native-base";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons  size={23} style={{ marginBottom: -0 }} {...props} />;
}
function TabBarIcon2(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={20} style={{ marginBottom: -0 }} {...props} />;
}



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pet Health ',
          tabBarIcon: ({ color }) => <TabBarIcon name="health-and-safety" color={color} />
        }}
      />
      <Tabs.Screen
        name="QRForm"
        options={{
          title: 'Qr Form',
          tabBarIcon: ({ color }) => <TabBarIcon2 name="file-waveform" color={color} />,
        }}
      />
    </Tabs>
 
  );
}
