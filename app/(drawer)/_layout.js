import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect,useState } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../../assets/firebaseConfig';
import { router, usePathname,useNavigation } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();
  const navigation = useNavigation();
  const [userdisplayname, setUserdisplayname] = useState('');
  const [adminUser, setAdminUser] = useState(false);
  
const getUserDetails = async()=>{
 const userDisplayname =  await AsyncStorage.getItem('displayEmail');
 console.log('userdisplayname in drawer',userdisplayname)

 if(userDisplayname === 'admin@test.com'){
  setAdminUser(true)
 }else{
  setAdminUser(false)
 }
 if(userDisplayname){
 setUserdisplayname(userDisplayname);
 }
}

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      // Clear stored tokens
      await AsyncStorage.removeItem('refreshToken');
      // Navigate to login screen
      navigation.navigate('index'); 
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  useEffect(() => {
    console.log(pathname);
    getUserDetails();
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={require('../../assets/prof.png')} 
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>Username</Text>
          <Text style={styles.userEmail}>{userdisplayname}</Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname === "/home" ? "#fff" : "#000"}
          />
        )}
        label="Home"
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/home" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname === "/itam list" ? "#333" : "#fff" }}
        onPress={() => router.push("/(drawer)/(tabs)/home")}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <AntDesign
            name="user"
            size={size}
            color={pathname === "/profile" ? "#fff" : "#000"}
          />
        )}
        label="Profile"
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname === "/profile" ? "#333" : "#fff" }}
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
      />
     
     
       <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname === "/CustomerRegister" ? "#fff" : "#000"}
          />
        )}
        label="Customer Register"
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/CustomerRegister" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname === "/CustomerRegister" ? "#333" : "#fff" }}
        onPress={() => router.push("/CustomerRegister")}
      />
       <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="settings-outline"
            size={size}
            color={pathname === "/settings" ? "#fff" : "#000"}
          />
        )}
        label="Settings"
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname === "/settings" ? "#333" : "#fff" }}
        onPress={() => router.push("/settings")}
      />
     {adminUser && (
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname === "/SCRegister" ? "#fff" : "#000"}
          />
        )}
        label="Service Center Register"
        labelStyle={[
          styles.navItemLabel,
          { color: pathname === "/SCRegister" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname === "/SCRegister" ? "#333" : "#fff" }}
        onPress={() => router.push("/SCRegister")}
      /> 
      )}
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="log-out"
            size={size}
            color="#000"
          />
        )}
        label="Logout"
        labelStyle={styles.navItemLabel}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Drawer.Screen name="settings" options={{ headerShown: true }} />
      <Drawer.Screen name="CustomerRegister" options={{ headerShown: true }} /> */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center", 
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    width: 60, 
    height: 80, 
    borderRadius: 30, 
    resizeMode: 'cover', 
  },
  userDetailsWrapper: {
    marginLeft: 10,
    justifyContent: 'center', 
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});