import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  return (
   <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
    <Tabs.Screen name='home' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'Dashboard',
      headerTitle: 'Dashboard',
      headerRight: () => <Image source={require('../../../assets/dashbordprof.png')} style={styles.profilePhoto}
      />
    }} />
    <Tabs.Screen name='profile' options={{
      tabBarIcon: ({color}) => (
        <AntDesign name="user" size={24} color={color} />
      ),
      tabBarLabel: 'Profile',
      headerTitle: 'Profile'
    }} />
    <Tabs.Screen name='Reminder' options={{
      tabBarIcon: ({color}) => (
        // <AntDesign name="ClockCircleOutlined" size={24} color={color} />
        <FontAwesome name="bell" size={24} color={color}/>
      ),
      tabBarLabel: 'Reminder',
      headerTitle: 'Reminder'
    }} />
   </Tabs>
  )
}

const styles = StyleSheet.create({
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 45,
    alignSelf: 'right',
    marginRight: 10,
    marginBottom: 5,
    }
});