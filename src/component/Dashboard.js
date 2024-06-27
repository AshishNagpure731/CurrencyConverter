import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { AppContext } from '../../context';
import CurrencyConvert from './CurrencyConvert';

const Dashboard = ({ navigation }) => {
  const [DataINR, setDataINR] = useState({});
  const { curr } = useContext(AppContext);

  useEffect(() => {
    // Update DataINR when curr changes
    if (curr && curr["INR"] === 1) {
      setDataINR(curr);
    }
  }, [curr]);

  if (!curr) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={{fontSize:20}}>Some Popular Currency Rate with respect to Indian Rupee INR</Text>
        {Object.keys(DataINR).length > 0 && Object.keys(DataINR).map((key, i) => (
          (key === 'USD' || key === 'AED' || key === 'AUD') ? <Text style={{fontSize:20}} key={i}>{key}: {DataINR[key]}</Text> : null
        ))}
        <Button title='Currency Conversion' onPress={() => navigation.navigate('CurrencyConvert')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    padding:20,
    fontSize:60
  },
});

export default Dashboard;
