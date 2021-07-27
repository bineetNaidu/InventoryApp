import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useCallback } from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Main from './tabs/Main';
import NewItem from './tabs/NewItem';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: FC<Props> = ({ navigation }) => {
  const handleLogout = useCallback(() => {
    navigation.replace('Login');
  }, [navigation]);

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
