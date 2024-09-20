import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonModalStyle } from '../commonStyle/globalStyle'; // Adjust the path if necessary

const CommonModalView = ({ visible, onClose, title, children, onCancel, onConfirm }) => {
  return (
    <Modal 
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={commonModalStyle.wrapper}>
        <View style={commonModalStyle.modalContent}>
          <TouchableOpacity style={commonModalStyle.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={commonModalStyle.title}>{title}</Text>
          <View style={{width:'100%'}}>
            {children} 
          </View>
          <View style={commonModalStyle.buttonContainer}>
            {onCancel && (
              <TouchableOpacity style={commonModalStyle.button} onPress={onCancel}>
                <Text style={commonModalStyle.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            {onConfirm && (
              <TouchableOpacity style={commonModalStyle.button} onPress={onConfirm}>
                <Text style={commonModalStyle.buttonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModalView;
