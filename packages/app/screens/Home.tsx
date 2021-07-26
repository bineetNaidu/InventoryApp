import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useCallback } from 'react';
import { Avatar } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';

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

  return (
    <SafeAreaView style={styles.container}>
      <Text>WelCome Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
  },
  headerRight: {
    marginRight: 15,
  },
});

export default Home;
