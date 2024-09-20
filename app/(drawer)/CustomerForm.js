import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { globalStyles } from '../commonStyle/globalStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerForm = ({ customer, onSave, onClose, isEditable = true }) => {
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehicles, setVehicles] = useState([{ vehicleNumber: '' }]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (customer) {
      setCustomerName(customer.customerName || '');
      setMobile(customer.mobile || '');
      setVehicles(customer.vehicles || [{ vehicleNumber: '' }]);
      setDate(customer.date ? new Date(customer.date) : new Date());
    } else {
      setCustomerName('');
      setMobile('');
      setVehicles([{ vehicleNumber: '' }]);
      setDate(new Date());
      //loadCustomerData();
    }
  }, [customer]);

  const saveCustomerData = async () => {
    try {
      await AsyncStorage.setItem('customerName', customerName);
      await AsyncStorage.setItem('mobile', mobile);
      await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));
      await AsyncStorage.setItem('date', date.toISOString());
    } catch (error) {
      console.error('Failed to save customer data to storage:', error);
    }
  };

  const formatVehicleNumber = (text) => {
    const cleaned = text.replace(/[^A-Z0-9]/g, '');

    const match = cleaned.match(/^([A-Z]{2})(\d{2})([A-Z]{2})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
    }

    return cleaned;
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { vehicleNumber: '' }]);
  };

  const handleVehicleChange = (index, value) => {
    const formattedValue = formatVehicleNumber(value);
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleNumber = formattedValue;
    setVehicles(newVehicles);
  };

  const handleRemoveVehicle = (index) => {
    const newVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(newVehicles);
  };

  const handleSave = () => {
    if (!customerName || !mobile || !date || vehicles.some(v => !v.vehicleNumber)) {
      Alert.alert('Error', 'Please fill all fields before saving!');
      return;
    }
  
    onSave({
      id: customer?.id,  
      customerName,
      mobile,
      vehicles,
      date
    });
  
    saveCustomerData();
    Alert.alert('Success', 'Customer Data Updated Successfully!');
  
    setCustomerName('');
    setMobile('');
    setVehicles([{ vehicleNumber: '' }]);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={globalStyles.label}>Customer Name:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={customerName}
          onChangeText={setCustomerName}
          editable={isEditable} // Set editable prop based on isEditable
        />
      </View>
      
      <Text style={globalStyles.label}>Mobile:</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          value={mobile}
          onChangeText={(text) => {
            if (/^\d{0,10}$/.test(text)) {
              setMobile(text);
            }
          }}
          keyboardType="numeric"
          maxLength={10}
          editable={isEditable} 
        />
      </View>

      <Text style={globalStyles.label}>Date Of Customer Registration:</Text>
      <TouchableOpacity
        style={styles.dateInputContainer}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <Icon name="calendar" size={20} color="#1ccfbe" style={styles.icon} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={handleDateChange}
        />
      )}

      <Text style={globalStyles.label}>Vehicle Numbers:</Text>
      {vehicles.map((vehicle, index) => (
        <View key={index} style={globalStyles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            value={vehicle.vehicleNumber}
            maxLength={13} // Allowing room for hyphens
            onChangeText={(text) => handleVehicleChange(index, text)}
            editable={isEditable} // Set editable prop based on isEditable
          />
          {isEditable && (
            <TouchableOpacity onPress={handleAddVehicle}>
              <Icon name="plus" size={20} color="#1ccfbe" style={styles.icon} />
            </TouchableOpacity>
          )}
          {isEditable && vehicles.length > 1 && (
            <TouchableOpacity onPress={() => handleRemoveVehicle(index)}>
              <Icon name="minus" size={20} color="#1ccfbe" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 12,
  },
  dateText: {
    
    fontSize: 16,
    color: '#FF6347'
  },
  icon: {
    marginLeft: 10,
  },
});

export default CustomerForm;