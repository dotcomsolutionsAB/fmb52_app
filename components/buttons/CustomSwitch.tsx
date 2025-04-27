import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomSwitchProps {
  value: string;
  onChange: (value: string) => void;
  label1: string;
  label2: string;
  customStyle?: StyleSheet;
}

export default function CustomSwitch({ value, onChange, label1, label2,customStyle }: CustomSwitchProps) {
  const handleToggle = () => {
    onChange(value === label1 ? label2 : label1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={handleToggle} 
        style={[styles.switchContainer,customStyle]}
      >
        <View 
          style={[
            styles.labelContainer, 
            value === label1 ? styles.activeLabel : styles.inactiveLabel
          ]}
        >
          <Text style={styles.labelText}>{label1}</Text>
        </View>
        
        <View 
          style={[
            styles.labelContainer, 
            value === label2 ? styles.activeLabel : styles.inactiveLabel
          ]}
        >
          <Text style={styles.labelText}>{label2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    width: 60,
    height: 25,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor:'#8E8E93'
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:100
  },
  activeLabel: {
    backgroundColor: "#CBA652",
    borderRadius:100
  },
  inactiveLabel: {
    backgroundColor: '#8E8E93',
  },
  labelText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  }
});
