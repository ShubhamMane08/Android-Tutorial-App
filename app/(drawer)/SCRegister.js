import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../commonStyle/globalStyle';
import SCForm from './SCForm';
import { _get, _post } from '../global/axiosInstance';
import CommonModalView from '../global/CommonModalView';
import { useFocusEffect } from '@react-navigation/native';

const SCItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={[styles.customerItem, { flex: 1 }]}>
      <Text style={styles.customername}>Name: {item.serviceCenterName || "N/A"}</Text>
      <Text style={styles.customerText}>Mobile: {item.proprietorMobile || "N/A"}</Text>
      <Text style={styles.customerText}>Address: {item.serviceCenterAddress || "N/A"}</Text>
    </View>
  </TouchableOpacity>
));

const SCRegister = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceCenter, setSelectedServiceCenter] = useState(null);

  console.log(serviceCenters)

  useFocusEffect(
    useCallback(() => {
      const loadServiceCenterData = async () => {
        setLoading(true);
        try {
          const response = await _get('/serviceCenters.json');
          const data = response.data;
          const centersArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setServiceCenters(centersArray);
        } catch (error) {
          console.error('Failed to load service centers:', error);
        } finally {
          setLoading(false);
        }
      };

      loadServiceCenterData();
    }, [])
  );

  const filteredServiceCenters = useMemo(() => {
    return serviceCenters.filter(center =>
      (center.serviceCenterName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (center.proprietorMobile || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (center.serviceCenterAddress || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, serviceCenters]);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => {
    setSelectedServiceCenter(null);
    setModalVisible(false);
  };

  const handleSaveFunction = async (formData) => {
    try {
      if (formData.id) {
        // Add logic to update the service center if necessary
      } else {
        const response = await _post('/serviceCenters.json', formData);
        const newSCId = response.data.name;
        const newServiceCenter = { ...formData, id: newSCId };
        setServiceCenters(prev => [...prev, newServiceCenter]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register new service center');
      console.error('Registration error:', error);
    } finally {
      handleCloseModal();
    }
  };

  const handleEditServiceCenter = (center) => {
    setSelectedServiceCenter(center);
    handleOpenModal();
  };

  const renderServiceCenterItem = useCallback(({ item }) => (
    <SCItem item={item} onPress={handleEditServiceCenter} />
  ), []);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" color="red" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={handleOpenModal}>
        <Text>Register New Service Center</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name/mobile"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredServiceCenters}
        renderItem={renderServiceCenterItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
      <CommonModalView
        visible={modalVisible}
        onClose={handleCloseModal}
        title={selectedServiceCenter ? "Edit Service Center" : "New Service Center"}
      >
        <SCForm
          serviceCenter={selectedServiceCenter}
          onSave={handleSaveFunction}
          onClose={handleCloseModal}
        />
      </CommonModalView>
    </View>
  );
};

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
  customername: {
    color: '#006B9D',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default SCRegister;
