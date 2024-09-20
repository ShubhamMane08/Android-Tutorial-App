import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState,useEffect } from 'react';
import { auth } from '../assets/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { database } from '../assets/firebaseConfig';
// import { ref, set, push } from 'firebase/database';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Link, useNavigation } from 'expo-router';
import { _get } from './global/axiosInstance';

export default function Page() {
  const [username, setUsername] = useState('akash@test.com');
  const [password, setPassword] = useState('123456');
  const [errormsg, setErrormsg] = useState('');
  const [serviceCenterId, setServiceCenterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedUsermailId, setLoggedUsermailId] = useState();
  const navigation = useNavigation();


  const handleLogin = async () => {
    try {
      
      const response = await signInWithEmailAndPassword(auth, username, password);
      const refreshToken = response._tokenResponse.refreshToken;
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('displayEmail', response._tokenResponse.email);
      setLoggedUsermailId(response._tokenResponse.email);
      console.log('Login succesfully done',response)
      navigation.navigate('(drawer)');
    } catch (error) {
      
      if(error){
        setErrormsg('Invalid Username or Password !!')
        console.log('Invalid Username or Password !!')
      }
      // Handle login errors
      //Alert.alert('Login Failed', error.message);
    }
  };

  useEffect(() => {
   
    const loadServiceCenterData = async () => {
      if(loggedUsermailId){
      const loggedInemail = await AsyncStorage.getItem('displayEmail');
console.log('loggedInemail',loggedInemail)
      try {
        setLoading(true);
        const response = await _get('/serviceCenters.json');
        const data = response.data;
        console.log('all data',data)
        if (data) {
          const serviceCenters = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));

          // Find the service center with the given proprietorMobile
          const center = serviceCenters.find(center => center.proprietorEmail === loggedInemail);
          console.log('extact center data',center)
          if (center) {
            setServiceCenterId(center.id);
            await AsyncStorage.setItem('SCId',center.id);
          }else{
            await AsyncStorage.removeItem('SCId');
          }
        }
      } catch (error) {
        console.error('Failed to load service centers from Firebase:', error.message);
      } finally {
        setLoading(false);
      }
    }
  }
    loadServiceCenterData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        contentInset={{ bottom: 50 }}
      >
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.titleLogo}>Bike Clinic</Text>
      <Animated.View entering={FadeIn.delay(1000)} exiting={FadeOut.delay(500)} style={styles.logoContainer}>
      <View style={styles.containerimg}>
        <Image 
          source={require('../assets/repair1.1.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        </View>
      </Animated.View>

      

      <View style={styles.loginWraper}>
      {errormsg && (<View><Text style={styles.errormsg}>{errormsg}</Text></View>)}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
            
     {/* <Link href={'(drawer)/(tabs)/home'} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>आत जावा</Text>
        </TouchableOpacity>
      </Link> */}


         
           <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>       

      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerimg:{
   justifyContent:'center'
  },
  title: {
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center', 
    marginTop:50,
  },
  titleLogo:{
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#1f93ce', 
    textAlign: 'center', 
    marginTop:10,
    height:50
  },
  loginWraper:{
    flex:1,
    alignContent:'center',
    marginTop:-100
  },
  logoContainer: {
    marginBottom: 0,
  },
  logo: {
    maxWidth:420,
    height: 450,
    marginTop:-80
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#252F40',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errormsg:{
    color:'red',
    marginBottom:15,
    alignSelf:'center'
  }
});
