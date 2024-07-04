import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './src/component/Dashboard';
import { AppContext } from './context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrencyConvert from './src/component/CurrencyConvert';

const Stack = createStackNavigator();

export default function App() {
  const [curr, setCurr] = useState({});
  const [Data, setData] = useState("");

  // Function to fetch currency rates from API
  const ApiCall = (Currency) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`https://open.er-api.com/v6/latest/${Data === "" ? Currency : Data}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCurr(result.rates);
      })
      .catch((error) => console.error(error));
  };

  // Function to handle dispatching user events
  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_USER':
        // Handle adding user action if needed
        break;
      case 'Preferred_Currency':
        setData(payload.currID); 
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    ApiCall("INR"); 
  }, []);

  useEffect(() => {
    if (Data !== "") {
      ApiCall(Data);
    }
  }, [Data]);

  return (
    <NavigationContainer>
      <AppContext.Provider value={{ curr, dispatchUserEvent }}>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CurrencyConvert" component={CurrencyConvert} />
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}
