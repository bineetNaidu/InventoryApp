import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Login: FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#442BAA',
      },
      headerTitleStyle: { color: '#fff' },
      headerTintColor: '#fff',
    });
  }, []);

  const handleLogin = useCallback(() => {
    async () => {};
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.fields}>
        <Text h4 style={{ color: '#fff', fontStyle: 'italic' }}>
          Login in to
        </Text>
        <Text
          h1
          style={{ color: '#fff', marginBottom: 25, fontStyle: 'italic' }}
        >
          InventoryApp
        </Text>
        <Input
          style={styles.input}
          label="Username"
          labelStyle={styles.labels}
          leftIcon={<AntDesign name="user" size={24} color="#fff" />}
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
        <Input
          secureTextEntry
          label="Password"
          labelStyle={styles.labels}
          style={styles.input}
          leftIcon={<AntDesign name="lock1" size={24} color="#fff" />}
          value={password}
          onChangeText={(password) => setPassword(password)}
          onSubmitEditing={handleLogin}
        />
        <Button title="Login!" onPress={handleLogin} />
        <Button
          title="Don't have an Account!"
          type="clear"
          onPress={() => navigation.navigate('Register')}
          titleStyle={{ ...styles.labels, textDecorationLine: 'underline' }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
  },
  input: {
    paddingLeft: 10,
    color: '#fff',
  },
  labels: {
    color: '#fff',
    letterSpacing: 0.5,
  },
  fields: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Login;
