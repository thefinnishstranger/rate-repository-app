// OrderingSelector.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  },
});

const OrderingSelector = ({ orderBy, setOrderBy }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={orderBy}
        onValueChange={(itemValue) => setOrderBy(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE" />
        <Picker.Item label="Lowest rated repositories" value="-RATING_AVERAGE" />
      </Picker>
    </View>
  );
};

export default OrderingSelector;
