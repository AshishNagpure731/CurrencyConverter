import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput,StyleSheet, FlatList, ScrollView, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Dimensions} from 'react-native';

import { AppContext } from '../../context';
import ModalDropdown from 'react-native-modal-dropdown';
// import { FlatList } from 'react-native-web';

const CurrencyConvert = () => {
  const { dispatchUserEvent, curr } = useContext(AppContext);


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [secondaryCurrency, setSecondaryCurrency] = useState("");
  const [obtainCurrency, setObtainCurrency] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    // Update obtainCurrency when curr changes
    if (curr && Object.keys(curr).length > 0) {
      setObtainCurrency(curr);
      dispatchUserEvent('Preferred_Currency', { currID: selectedCurrency });
    }
  }, [ selectedCurrency]);

  useEffect(() => {
    // Calculate converted amount when secondaryCurrency changes
    if (obtainCurrency && Object.keys(obtainCurrency).length > 0) {
      Object.keys(curr).forEach(key => { //obtainCurrency
        if (key === secondaryCurrency) {
          const val = parseInt(text);
          
          setText1(val * curr[secondaryCurrency]);
        }
      });
    }
  }, [secondaryCurrency]);


  return (
    <ScrollView style={{backgroundColor:'rgb(183, 181, 151)'}}
   >
    <View style={{
    //  borderWidth:5,
    padding:10,
      flex: 1,
      justifyContent:"center"
      }}>
      
      {/* <Picker 
        style={styles.picker}
  itemStyle={styles.itemStyle}
  labelStyle={styles.labelStyle}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        {Object.keys(curr || {}).map((key, index) => (
          <Picker.Item key={index} label={key} value={key} />
        ))}
      </Picker> */}
      <View style={{
        height:windowHeight/2,
        // borderWidth:0.5,
        
        justifyContent:'space-evenly'
      }}>
      <Text style={{fontSize:25, textAlign:'center',color:'rgb(60, 54, 51)'}}>Primary Currency</Text>
      <ModalDropdown options={Object.keys(curr || {})} onSelect={(index, value) => {setSelectedCurrency(value)}}
        style={{maxWidth:windowWidth,borderWidth:1}}
        textStyle={{fontSize:20,color:'rgb(60, 54, 51)'}}
        dropdownStyle={{width:windowWidth}}
        dropdownTextStyle={{ fontSize: 25, textAlign: 'center',color:'rgb(60, 54, 51)',backgroundColor:'rgb(224, 204, 190)' }}
      />


      <View style={{ }}>
      <Text style={{color:'rgb(60, 54, 51)'}}>Value To Convert</Text>
        <TextInput

          placeholder="Enter amount to convert"
          onChangeText={newText => setText(newText)}
          value={text}
          style={{fontSize:20,borderWidth:0.5}}
          keyboardType="numeric"
        />
      </View>

      <Text style={{fontSize:25,textAlign:'center',color:'rgb(60, 54, 51)'}}>Secondary Currency</Text>
      {/* <Picker
        selectedValue={secondaryCurrency}
        onValueChange={(itemValue) => setSecondaryCurrency(itemValue)}
      >
        {Object.keys(obtainCurrency || {}).map((key, i) => (
          <Picker.Item key={i} label={key} value={key} />
        ))}
      </Picker> */}

      <ModalDropdown options={Object.keys(obtainCurrency || {})} onSelect={(index, value) => {setSecondaryCurrency(value)}}
                style={{maxWidth:windowWidth,borderWidth:1}}
        textStyle={{fontSize:20,color:'rgb(60, 54, 51)'}}
        dropdownStyle={{width:windowWidth}}
        dropdownTextStyle={{ fontSize: 25, textAlign: 'center',color:'rgb(60, 54, 51)' ,backgroundColor:'rgb(224, 204, 190)'}}
      />
      
      <View style={{ }}>
      <Text style={{color:'rgb(60, 54, 51)'}}>Converted Value</Text>
        <TextInput
          style={{fontSize:20,color:'black',borderWidth:0.5}}
          placeholder="Converted amount"
          value={text1.toString()}
          editable={false}
        />
      </View>
      </View>
    </View>
    </ScrollView>
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
