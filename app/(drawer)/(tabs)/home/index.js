import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { _getloader, _get } from '../../../global/axiosInstance';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Week'); 
  const [serviceCenterData, setServiceCenterData] = useState([]);
  const [serviceCenterId, setServiceCenterId] = useState();
  const [currentloggedUser, setCurrentloggedUser] = useState();

  useFocusEffect(
    useCallback(() => {
      const loadServiceCenterData = async () => {
        const loggedInEmail = await AsyncStorage.getItem('displayEmail');
        try {
          setLoading(true);
          const response = await _get('/serviceCenters.json');
          const data = response.data;
          setServiceCenterData(data)
          setServiceCenterId(data.proprietorMobile)
          if (data) {
            const serviceCenters = Object.keys(data).map(key => ({
              id: key,
              ...data[key],
            }));
            const center = serviceCenters.find(center => center.proprietorEmail === loggedInEmail);
            if (center) {
              setCurrentloggedUser(center);
              setServiceCenterId(center.id);
              await AsyncStorage.setItem('currentSCId', center.id);
              await AsyncStorage.setItem('serviceCenterName', center.serviceCenterName);
            }
          }
        } catch (error) {
          console.error('Failed to load service centers from Firebase:', error.message);
        } finally {
          setLoading(false);
        }
      };

      loadServiceCenterData();
    }, [])
  );

  // Sample data for Weekly and Monthly stats
  const weeklyData = [
    { name: 'Bike Registered', population: 10, color: '#f39c12', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Bike Service', population: 6, color: '#e74c3c', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Service Reminder', population: 4, color: '#8e44ad', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const monthlyData = [
    { name: 'Bike Registered', population: 40, color: '#f39c12', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Bike Service', population: 30, color: '#e74c3c', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Service Reminder', population: 20, color: '#8e44ad', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  // Determine which data to show based on selectedValue (Week or Month)
  const pieData = selectedValue === 'Week' ? weeklyData : monthlyData;

  if (loading) {
    return _getloader();
  }

  return (
    <ScrollView style={styles.container}>
      {/* Heading Section */}
      <View style={styles.box}>
        <Text style={styles.heading}>{currentloggedUser && currentloggedUser?.serviceCenterName}</Text>
      </View>

      {/* Dropdown for Week/Month Selection */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'Week', value: 'Week' },
          { label: 'Month', value: 'Month' },
        ]}
        value={selectedValue}
        style={pickerSelectStyles}
      />

      {/* Cards Section */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Bike registered</Text>
          <Text style={styles.cardText}>{currentloggedUser && Object.keys(currentloggedUser?.customers).length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Bike Service</Text>
          <Text style={styles.cardText}>{currentloggedUser && Object.keys(currentloggedUser?.customers).length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Service Reminder</Text>
          <Text style={styles.cardText}>{currentloggedUser && Object.keys(currentloggedUser?.customers).length}</Text>
        </View>
      </View>

      {/* Pie Chart */}
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1e2923',
          backgroundGradientFrom: '#08130D',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF5E6',
  },
  box: {
    padding: 16,
    backgroundColor: '#34495e',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1abc9c',
    width: '32%',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chart: {
    marginBottom: 16,
    borderRadius: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#34495e',
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#34495e',
    marginBottom: 16,
  },
});
