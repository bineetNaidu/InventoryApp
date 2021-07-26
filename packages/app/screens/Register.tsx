import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Register: FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#442BAA',
      },
      headerTitleStyle: { color: '#fff' },
      headerTintColor: '#fff',
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>Register</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
  },
});

export default Register;
