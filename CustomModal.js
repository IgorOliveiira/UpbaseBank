import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, title, message, buttons, closeModal }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
          <Text>{message}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: 10, marginRight: 10, backgroundColor: '#06436B', borderRadius: 5 }}
                onPress={() => {
                  button.onPress();
                  closeModal();
                }}
              >
                <Text style={{ color: 'white' }}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
