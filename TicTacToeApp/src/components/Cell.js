import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Cell = ({ value, onPress, disabled, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.cell, style]} 
      onPress={onPress}
      disabled={disabled || value !== null}
      activeOpacity={0.7}
    >
      {value === 'X' && (
        <MaterialCommunityIcons name="close" size={50} color="#FF5252" />
      )}
      {value === 'O' && (
        <MaterialCommunityIcons name="circle-outline" size={50} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  }
});

export default Cell;