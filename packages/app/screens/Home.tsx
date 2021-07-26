import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>WelCome Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
