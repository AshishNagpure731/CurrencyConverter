import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { AppContext } from '../../context';

const CurrencyConvert = () => {
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [secondaryCurrency, setSecondaryCurrency] = useState("");
  const [obtainCurrency, setObtainCurrency] = useState({});
  const { dispatchUserEvent, curr } = useContext(AppContext);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    // Update obtainCurrency when curr changes
    if (curr && Object.keys(curr).length > 0) {
      setObtainCurrency(curr);
      dispatchUserEvent('REMOVE_USER', { currID: selectedCurrency });
    }
  }, [ selectedCurrency]);

  useEffect(() => {
    // Calculate converted amount when secondaryCurrency changes
    if (obtainCurrency && Object.keys(obtainCurrency).length > 0) {
      Object.keys(obtainCurrency).forEach(key => {
        if (key === secondaryCurrency) {
          const val = parseInt(text);
          console.log(val)
          console.log(key)
          console.log(obtainCurrency[secondaryCurrency])
          setText1(val * obtainCurrency[secondaryCurrency]);
        }
      });
    }
  }, [secondaryCurrency]);

  return (
    <View style={{
      flexGrow: 1,
      }}>
      <Text style={{fontSize:25}}>Primary Currency</Text>
      <Picker 
        style={styles.picker}
  itemStyle={styles.itemStyle}
  labelStyle={styles.labelStyle}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        {Object.keys(curr || {}).map((key, index) => (
          <Picker.Item key={index} label={key} value={key} />
        ))}
      </Picker>

      <View style={{ borderWidth: 2 }}>
        <TextInput
          placeholder="Enter amount to convert"
          onChangeText={newText => setText(newText)}
          value={text}
          style={{fontSize:20}}
          keyboardType="numeric"
        />
      </View>

      <Text style={{fontSize:25}}>Secondary Currency</Text>
      <Picker
        selectedValue={secondaryCurrency}
        onValueChange={(itemValue) => setSecondaryCurrency(itemValue)}
      >
        {Object.keys(obtainCurrency || {}).map((key, i) => (
          <Picker.Item key={i} label={key} value={key} />
        ))}
      </Picker>

      <View style={{ borderWidth: 2 }}>
        <TextInput
          style={{fontSize:20,color:'black'}}
          placeholder="Converted amount"
          value={text1.toString()} // Ensure to display as string
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 'auto',

    backgroundColor: '#f0f0f0',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 28, 
    color: 'blue', 
  },
});

export default CurrencyConvert;
