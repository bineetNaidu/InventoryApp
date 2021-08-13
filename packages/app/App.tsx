import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Product from './screens/Product';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import { useInventoryLocationStore } from './lib/inventoryLocation.store';
import { ax } from './lib/axios';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const setInventories = useInventoryLocationStore((s) => s.setInventories);

  const fetchAllInventories = async () => {
    const { data } = await ax.get<{
      inventoryLocations: InventoryLocationsType[];
      length: number;
      success: boolean;
    }>('/inventory_location');

    if (data.success) {
      setInventories(data.inventoryLocations);
    }
  };

  useEffect(() => {
    fetchAllInventories();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Product"
        headerMode="float"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
