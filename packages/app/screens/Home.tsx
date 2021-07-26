import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useCallback } from 'react';
import { Avatar, Text } from 'react-native-elements';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Main from './tabs/Main';

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
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Main') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Setting') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
              // @ts-ignore
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            tabStyle: {
              justifyContent: 'flex-start',
              // alignContent: 'center',
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Main" component={Main} />
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
