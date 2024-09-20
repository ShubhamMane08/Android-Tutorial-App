import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity,Image } from 'react-native';

import moment from 'moment';
import { useNavigation } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonModalView from '../../global/CommonModalView';
import BikeServiceForm from './BikeServiceForm';
import { _get, _getloader, _post } from '../../global/axiosInstance';
import { globalStyles } from '../../commonStyle/globalStyle';


const CustomerItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={[styles.customerItem, { flex: 1 }]}>
      <Text style={styles.customername}>Name: {item.customerName || "N/A"}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.customerText}>Vehicles: {item.vehicles && item.vehicles.map((vehicle, index) => (
          <Text key={`${vehicle?.vehicleNumber}-${index}`} style={styles.vehicleText}>
            {index === 0 ? "  " : " , "}{vehicle?.vehicleNumber}
          </Text>
        ))}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

export default function BikeService() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [serviceCenterId, setServiceCenterId] = useState(null);

  useFocusEffect(
  React.useCallback(() => {
    const loadServiceCenterData = async () => {
      const loggedInEmail = await AsyncStorage.getItem('displayEmail');
     // console.log('Logged In Email:', loggedInEmail);  // Debugging log
      try {
        setLoading(true);
        const response = await _get('/serviceCenters.json');
        const data = response.data;
        if (data) {
          const serviceCenters = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          const center = serviceCenters.find(center => center.proprietorEmail === loggedInEmail);
          if (center) {
            setServiceCenterId(center.id);
            await AsyncStorage.setItem('currentServiceCenterId', center.id);
           // console.log('Service Center ID:', center.id);  // Debugging log
          }
        }
      } catch (error) {
        console.error('Failed to load service centers:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadServiceCenterData();
  }, [])
)

useFocusEffect(
  React.useCallback(() => {
    const loadCustomerData = async () => {
      if (!serviceCenterId) return;

      console.log('Loading Customers for Service Center ID:', serviceCenterId);  // Debugging log
      try {
        setLoading(true);
        const response = await _get(`/serviceCenters/${serviceCenterId}/customers.json`);
        const data = response.data;
        if (data) {
          const customersArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setCustomers(customersArray);
          console.log('Loaded Customers:', customersArray);  // Debugging log
        }
      } catch (error) {
        console.error('Failed to load customers:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCustomerData();
  }, [serviceCenterId])
)

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => 
      (customer.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.mobile || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.vehicles && customer.vehicles.some(vehicle => vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [searchTerm, customers]);

  const handleOpenModal = () => {
    setSelectedCustomer(null);
    setModalVisible(true);
  }
  const handleOpenEditModal = () => setModalVisible(true);
  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setModalVisible(false);
  };

  const handleFormSave = async (formData) => {
    try {
      if (formData.id) {
        await _put(`/serviceCenters/${serviceCenterId}/customers/${formData.id}.json`, formData);
        setCustomers(prev => prev.map(customer => 
          customer.id === formData.id ? { ...customer, ...formData } : customer
        ));
      } else {
        const response = await _post(`/serviceCenters/${serviceCenterId}/customers.json`, formData);
        const newCustomerId = response.data.name;
        const newCustomer = { ...formData, id: newCustomerId };
        setCustomers(prev => [...prev, newCustomer]);
      }
    } catch (error) {
      Alert.alert('Error', formData.id ? 'Failed to update customer' : 'Failed to register new customer');
      console.error('Error:', error);
    } finally {
      handleCloseModal();
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    handleOpenEditModal();
  };

  const renderCustomerItem = useCallback(({ item }) => (
    <CustomerItem item={item} onPress={handleEditCustomer} />
  ), []);

  if (loading) {
    return _getloader();
  }
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={handleOpenModal}>
        <Text>Register New Customer</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name/mobile/vehicle no"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
      <CommonModalView
        visible={modalVisible}
        onClose={handleCloseModal}
        title={"Service Registration"}
      >
        <BikeServiceForm
          onSave={handleFormSave}
          onClose={handleCloseModal}
          customer={selectedCustomer}
        />
      </CommonModalView>
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
    customername:{
      color: '#006B9D',
      fontWeight:'bold',
      fontSize: 17,
    }
});
