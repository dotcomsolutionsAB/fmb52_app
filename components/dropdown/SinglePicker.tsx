import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";

interface SinglePickerProps {
  label: string;
  options: Array<{ label: string; value: string }>;
  labelField: string;
  valueField: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

const SinglePicker: React.FC<SinglePickerProps> = ({
  label,
  options,
  labelField,
  valueField,
  onChange,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        data={options}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholder}
        labelField={labelField}
        valueField={valueField}
        placeholder="Select an option"
        value={selectedValue}
        onChange={(item) => {
          setSelectedValue(item[valueField]);
          onChange(item[valueField]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 10,
  },
  label: {
    color: Colors.light.accent,
    fontWeight: "500",
    fontSize: 14,
  },
  dropdown: {
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderRadius: 7,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 5,
    height: 50,
  },
  dropdownContainer: {
    maxHeight: 200, // Set a maximum height for the dropdown
  },
  placeholder: {
    color: Colors.light.accent,
  },
});

export default SinglePicker;
