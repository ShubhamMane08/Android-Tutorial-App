import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const BikeServiceForm = ({ customer, onSave, onClose, isEditable = true }) => {
    const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehicles, setVehicles] = useState([{ vehicleNumber: '' }]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [selectedBike, setSelectedBike] = useState('');
  const [services, setServices] = useState({
    oilChange: false,
    fullService: false,
    mediumService: false,
    miscellaneous: false,
  });
  const [remark, setRemark] = useState('');
  const [serviceDate, setServiceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
console.log('Vehicles', vehicles)
  const bikes = vehicles; // Replace with actual bike names

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

  const handleServiceChange = (service) => {
    setServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handleSubmit = () => {
    // if (!selectedBike || !selectedServices || !remark || !serviceDate) {
    //     Alert.alert('Error', 'Please fill all fields before saving!');
    //     return;
    //   }
    const selectedServices = Object.keys(services).filter((key) => services[key]);
    console.log({
      selectedBike,
      selectedServices,
      remark,
      serviceDate,
    });
    // Handle form submission (e.g., API call)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Bike:</Text>
      <Picker
        selectedValue={selectedBike}
        onValueChange={(itemValue) => setSelectedBike(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a bike" value="" />
        {bikes.map((bike, index) => (
          <Picker.Item key={index} label={bike.vehicleNumber} value={bike?.vehicleNumber} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Services:</Text>
      {Object.keys(services).map((service) => (
        <View key={service} style={styles.checkboxContainer}>
          <Checkbox
            value={services[service]}
            onValueChange={() => handleServiceChange(service)}
          />
          <Text>{service.replace(/([A-Z])/g, ' $1').toLowerCase()}</Text>
        </View>
      ))}

      <Text style={styles.label}>Remark:</Text>
      <TextInput
        value={remark}
        onChangeText={setRemark}
        placeholder="Enter remarks"
        style={styles.input}
      />

      <Text style={styles.label}>Service Date:</Text>
      <Button title="Pick a date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={serviceDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setServiceDate(selectedDate);
          }}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default BikeServiceForm;
