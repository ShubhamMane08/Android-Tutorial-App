import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity  } from 'react-native'
import React,{useState, useEffect} from 'react'
import { globalStyles } from '../commonStyle/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCForm = ({ serviceCenter, onSave = () => {}, onClose, isEditable = true }) => {
    const [serviceCenterId, setServiceCenterId] = useState('');
  const [serviceCenterName, setServiceCenterName] = useState('');
  const [proprietorName, setProprietorName] = useState('');
  const [proprietorMobile, setProprietorMobile] = useState('');
  const [serviceCenterAddress, setServiceCenterAddress] = useState('');
  const [proprietorEmail, setProprietorEmail] = useState('');

  useEffect(() => {
    if (serviceCenter) {
      setServiceCenterId(serviceCenter.serviceCenterId || '');
      setServiceCenterName(serviceCenter.serviceCenterName || '');
      setProprietorName(serviceCenter.proprietorName || '');
      setProprietorMobile(serviceCenter.proprietorMobile || '');
      setServiceCenterAddress(serviceCenter.serviceCenterAddress || '');
      setProprietorEmail(serviceCenter.proprietorEmail || ''); 
    } else {
      loadServiceCenterData();
    }
  }, [serviceCenter]);

  const loadServiceCenterData = async () => {
    try {
      const savedServiceCenterId = await AsyncStorage.getItem('serviceCenterId');
      const savedServiceCenterName = await AsyncStorage.getItem('serviceCenterName');
      const savedProprietorName = await AsyncStorage.getItem('proprietorName');
      const savedProprietorMobile = await AsyncStorage.getItem('proprietorMobile');
      const savedServiceCenterAddress = await AsyncStorage.getItem('serviceCenterAddress');
      const savedProprietorEmail = await AsyncStorage.getItem('savedProprietorEmail');

      if (savedServiceCenterId) setServiceCenterId(savedServiceCenterId);
      if (savedServiceCenterName) setServiceCenterName(savedServiceCenterName);
      if (savedProprietorName) setProprietorName(savedProprietorName);
      if (savedProprietorMobile) setProprietorMobile(savedProprietorMobile);
      if (savedServiceCenterAddress) setServiceCenterAddress(savedServiceCenterAddress);
      if (savedProprietorEmail) setProprietorEmail(savedProprietorEmail);
    } catch (error) {
      console.error('Failed to load service center data from storage:', error);
    }
  };

  const saveServiceCenterData = async () => {
    console.log('save data')
    try {
      await AsyncStorage.setItem('serviceCenterId', serviceCenterId);
      await AsyncStorage.setItem('serviceCenterName', serviceCenterName);
      await AsyncStorage.setItem('proprietorName', proprietorName);
      await AsyncStorage.setItem('proprietorMobile', proprietorMobile);
      await AsyncStorage.setItem('serviceCenterAddress', serviceCenterAddress);
      await AsyncStorage.setItem('proprietorEmail', proprietorEmail);
    } catch (error) {
      console.error('Failed to save service center data to storage:', error);
    }
  };

  const generateUniqueId = () => {
    return `sc_${Date.now()}`;
  };

  const handleSave = () => {
    console.log("in handle save")
    if (!serviceCenterName || !proprietorName || !proprietorMobile || !serviceCenterAddress || !proprietorEmail) {
      Alert.alert('Error', 'Please fill all fields before saving!');
      return;
    }

    if (!serviceCenterId) {
      // Generate a new unique ID if not provided
      setServiceCenterId(generateUniqueId());
    }
    const id = serviceCenterId || generateUniqueId();
    onSave({
      id: serviceCenter.id,
      serviceCenterName,
      proprietorName,
      proprietorMobile,
      serviceCenterAddress,
      proprietorEmail 
    });

    saveServiceCenterData();
    Alert.alert('Success', 'Service Center Data Updated Successfully!');

    setServiceCenterName('');
    setProprietorName('');
    setProprietorMobile('');
    setServiceCenterAddress('');
    setProprietorEmail(''); 
  };
  return (
    <View style={{ width: '100%' }}>
      <Text style={globalStyles.label}>Service Center Name:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={serviceCenterName}
          onChangeText={setServiceCenterName}
          editable={isEditable} // Set editable prop based on isEditable
        />
      </View>

      <Text style={globalStyles.label}>Proprietor Name:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={proprietorName}
          onChangeText={setProprietorName}
          editable={isEditable} // Set editable prop based on isEditable
        />
      </View>

      <Text style={globalStyles.label}>Proprietor Mobile:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={proprietorMobile}
          onChangeText={(text) => {
            if (/^\d{0,10}$/.test(text)) {
              setProprietorMobile(text);
            }
          }}
          keyboardType="numeric"
          maxLength={10}
          editable={isEditable}
        />
      </View>

      <Text style={globalStyles.label}>Proprietor Email:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={proprietorEmail}
          onChangeText={setProprietorEmail}
          editable={isEditable}
          keyboardType="email-address"
        />
      </View>

      <Text style={globalStyles.label}>Service Center Address:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={serviceCenterAddress}
          onChangeText={setServiceCenterAddress}
          editable={isEditable} // Set editable prop based on isEditable
        />
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      headertitle:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10
      },
      searchInput: {
        height: 40,
        borderColor: '#438776',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      customerItem: {
        padding: 10,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: '#438776',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        elevation: 5,
        shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      customerText: {
        fontSize: 16,
        marginBottom: 5,
      },
      vehicleText: {
        fontSize: 14,
        marginLeft: 15,
        paddingRight: 10,
        color: '#006B9D',
        borderRadius:20,
        },
        customername:{
          color: '#006B9D',
          fontWeight:'bold',
          fontSize: 17,
        }
});


export default SCForm