import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";


const CustomHeader = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => (
          <CustomHeader title={options.headerTitle} />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          //headerTitle: "Home",
          // headerRight: () => <Button onPress={() => {router.push('contact')}} title="Contact" />,
        }}
      />
      <Stack.Screen name="about" options={{ headerTitle: "About" }} />
    
      <Stack.Screen
        name="contact"
        options={{ headerTitle: "Contact", presentation: 'modal' }}
      />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}


const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#25abda",
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8.84,
    elevation: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
