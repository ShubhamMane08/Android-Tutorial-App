import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import CommonModalView from '../../global/CommonModalView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import CustomerForm from '../CustomerForm';
import { useNavigation } from 'expo-router';
import { globalStyles } from '../../commonStyle/globalStyle';
import { _get, _getloader, _post, _put } from '../../global/axiosInstance';
import Animated, { SlideOutRight } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const ITEM_HEIGHT = 100;

const CustomerItem = React.memo(({ item, onPress, onSendReminder }) => (
    <View exiting={SlideOutRight.delay(500)} style={styles.customerItem}>
      <Text style={styles.customername}>Name: {item.customerName || 'N/A'}</Text>
      <Text style={styles.customerText}>Mobile: {item.mobile || 'N/A'}</Text>
      <Text style={[styles.customerText, { color: item.date ? "#FF5733" : "#999" }]}>
        Date: {moment(item.date).format("DD/MM/YYYY") || "N/A"}
      </Text>
      <Text style={styles.customerText}>
        Vehicles: 
        {item.vehicles && item.vehicles.map((vehicle, index) => (
          <Text key={`${vehicle?.vehicleNumber}-${index}`} style={styles.vehicleText}>
            {index === 0 ? '' : ', '} 
            {vehicle?.vehicleNumber}
          </Text>
        ))}
      </Text>

      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => onSendReminder(item.mobile)} 
      >
        <Text>Send Reminder</Text>
      </TouchableOpacity>
    </View>
));

export default function Reminder() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSCID, setSelectedSCID] = useState(null);
  const [selectedSCName, setSelectedSCName] = useState(null);
  const [proprietorMobile, setProprietorMobile] = useState(null); // State for proprietorMobile

  useFocusEffect(
    useCallback(() => {
      const loadCustomerData = async () => {
        const SCId = await AsyncStorage.getItem('currentSCId');
        setSelectedSCID(SCId);
        const SCName = await AsyncStorage.getItem('serviceCenterName');
        setSelectedSCName(SCName);
        
        try {
          setLoading(true);
          const serviceCenterResponse = await _get(`/serviceCenters/${SCId}.json`);
          const serviceCenterData = serviceCenterResponse.data;

          if (serviceCenterData && serviceCenterData.proprietorMobile) {
            setProprietorMobile(serviceCenterData.proprietorMobile); // Fetch proprietorMobile
          }

          const response = await _get(`/serviceCenters/${SCId}/customers.json`);
          const data = response.data;
          
          if (data) {
            const customersArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key],
            }));
            setCustomers(customersArray);
          }
        } catch (error) {
          console.error('Failed to load customers from Firebase:', error.message);
        } finally {
          setLoading(false);
        }
      };

      loadCustomerData();
    }, [selectedSCID])
  );

  const filteredCustomers = useMemo(() => {
    const currentDate = moment(); 
    const cutoffDate = currentDate.subtract(82, 'days');

    return customers.filter(customer => {
      const customerDate = moment(customer.date);
      return customerDate.isBefore(cutoffDate) || customerDate.isSame(cutoffDate);
    }).filter(customer => 
      (customer.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.mobile || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.vehicleNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, customers]);

  const sendWp = (mobile, vehicleNumber, customerName) => {
    const msg =         `👋 Dear Customer, *${customerName}*
    \n\nThis is a friendly reminder from *${selectedSCName}* that it's time to service your 🏍️ Vehicle No. *${vehicleNumber}*. It has been over 3 months since your last service, and we recommend scheduling a maintenance appointment to keep your vehicle running smoothly.
    \n🔹If you have any questions or would like to book a service, please feel free to contact us at *${proprietorMobile}*. We look forward to assisting you.
    \n\nBest regards, *${selectedSCName}*
                      \n📲 *${proprietorMobile}*
    
                      \n\n👋 आदरणीय ग्राहक,  *${customerName}*
    
  🔹*${selectedSCName}* कडून आपल्याला एक सौम्य आठवण देत आहोत की आपल्या वाहनाची 🏍️*${vehicleNumber}*. सर्विस  करण्याची वेळ झाली आहे. आपल्या वाहनाची सर्विस  केल्यापासून ३ महिन्यांपेक्षा जास्त काळ झाला आहे, आणि आम्ही आपल्याला वाहनाची देखभाल करण्याचा सल्ला देतो.
    
  🔹आपल्याला काही प्रश्न असल्यास किंवा सेवा बुक करायची असल्यास, कृपया आमच्याशी संपर्क साधा:
  🔹आम्ही आपली सेवा करण्यास उत्सुक आहोत.
    
धन्यवाद,
      *${selectedSCName}*
       
कृपया मोकळ्या मनाने माझ्याशी संपर्क साधा 😊
 \n    📲 *${proprietorMobile}*`;
 
    
    const phoneWithCountryCode = `+91${mobile}`;
    const url = `whatsapp://send?text=${encodeURIComponent(msg)}&phone=${phoneWithCountryCode}`;

    Linking.openURL(url)
      .then(() => {
        
      })
      .catch(() => {
        Alert.alert("Error", "Make sure WhatsApp is installed on your device.");
      });
  };

  const handleReminderPress = (mobile, vehicleNumber, customerName) => {
    if (mobile && vehicleNumber) {
      sendWp(mobile, vehicleNumber, customerName);
    } else {
      Alert.alert('Error', 'Missing customer mobile or vehicle number');
    }
  };

  if (loading) {
    return _getloader();
  }

  return (
    <View style={styles.container}>
      {filteredCustomers.length === 0 ? (
        <Text style={{color:'red'}}>No customers found...</Text>
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name/mobile/RC..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <FlatList
            data={filteredCustomers}
            renderItem={({ item }) => (
              <CustomerItem 
                item={item} 
                onPress={() => {}}
                onSendReminder={(mobile) => handleReminderPress(mobile, item.vehicles[0]?.vehicleNumber, item.customerName)}  
              />
            )}
            keyExtractor={(item) => item.id}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            showsVerticalScrollIndicator={true}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    padding: 7,
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
    fontWeight:'bold'
  },
  customername: {
    color: '#006B9D',
    fontWeight: 'bold',
    fontSize: 17,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
