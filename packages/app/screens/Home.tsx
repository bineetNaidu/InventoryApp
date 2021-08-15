import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useCallback, useEffect } from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Main from './tabs/Main';
import NewItem from './tabs/NewItem';
import { useManufacturersStore } from '../lib/manufacturers.store';
import { useItemTypesStore } from '../lib/itemsTypes.store';
import { useItemStore } from '../lib/items.store';
import { ax } from '../lib/axios';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: FC<Props> = ({ navigation }) => {
  const setItems = useItemStore((s) => s.setItems);
  const setManufacturers = useManufacturersStore((s) => s.setManufacturers);
  const setItemsTypes = useItemTypesStore((s) => s.setItemsTypes);

  const handleLogout = useCallback(() => {
    AsyncStorage.removeItem('@InventoryAppToken', (err) => {
      if (err) {
        console.error(err);
      }
    });
    navigation.replace('Login');
  }, [navigation]);

  useEffect(() => {
    AsyncStorage.getItem('@InventoryAppToken').then((data) => {
      if (data == null) {
        handleLogout();
      }
      return;
    });
  }, []);

  const handleFetchItems = useCallback(async () => {
    const token = await AsyncStorage.getItem('@InventoryAppToken');
    if (!token) return;
    const { data } = await ax.get<{
      items: ItemsType[];
      length: number;
      success: boolean;
    }>('/items', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (data.success) {
      setItems(data.items);
    }
  }, [setItems]);

  const handleFetchManufacturers = useCallback(async () => {
    const token = await AsyncStorage.getItem('@InventoryAppToken');
    if (!token) return;
    const { data } = await ax.get<{
      manufacturers: ManufacturersType[];
      length: number;
      success: boolean;
    }>('/manufacturers', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data.success) {
      setManufacturers(data.manufacturers);
    }
  }, [setManufacturers]);

  const handleFetchItemsTypes = useCallback(async () => {
    const token = await AsyncStorage.getItem('@InventoryAppToken');
    if (!token) return;
    const { data } = await ax.get<{
      item_types: ItemTypesType[];
      length: number;
      success: boolean;
    }>('/item_types', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data.success) {
      setItemsTypes(data.item_types);
    }
  }, [setItemsTypes]);

  useEffect(() => {
    handleFetchItems();
    handleFetchManufacturers();
    handleFetchItemsTypes();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inventory.app',
      headerStyle: {
        backgroundColor: '#442BAA',
      },
      headerTitleStyle: { color: '#fff', fontSize: 22 },
      headerTintColor: '#fff',
      headerTitleAlign: 'left',
      headerLeft: () => null,
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleLogout}>
            <Avatar
              rounded
              source={{
                uri: 'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer independent>
        <Tab.Navigator
          initialRouteName="Main"
          tabBarOptions={{
            tabStyle: {
              justifyContent: 'flex-start',
              backgroundColor: '#442BAA',
              alignContent: 'center',
            },
            activeTintColor: '#D6D1E8',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="Main"
            component={Main}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused, color, size }) => (
                <AntDesign
                  name={focused ? 'appstore1' : 'appstore-o'}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="NewItem"
            component={NewItem}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused, color, size }) => (
                <AntDesign
                  name={focused ? 'plussquare' : 'plussquareo'}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    marginRight: 15,
  },
});

export default Home;
