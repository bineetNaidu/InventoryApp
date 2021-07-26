import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useState, useCallback } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Register: FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inventory_location, setInventoryLocation] = useState('');

  const handleRegister = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

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
      <ScrollView style={styles.fields}>
        <Text
          h3
          style={{ color: '#fff', fontStyle: 'italic', marginBottom: 30 }}
        >
          Create Your Account
        </Text>

        <Input
          style={styles.input}
          label="Email"
          autoFocus
          keyboardType="email-address"
          labelStyle={styles.labels}
          leftIcon={<AntDesign name="mail" size={24} color="#fff" />}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          style={styles.input}
          label="Username"
          labelStyle={styles.labels}
          leftIcon={<AntDesign name="user" size={24} color="#fff" />}
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
        <Input
          style={styles.input}
          label="Inventory Location"
          labelStyle={styles.labels}
          leftIcon={<FontAwesome name="globe" size={24} color="#fff" />}
          value={inventory_location}
          onChangeText={(inventory_location) =>
            setInventoryLocation(inventory_location)
          }
        />
        <Input
          secureTextEntry
          label="Password"
          labelStyle={styles.labels}
          style={styles.input}
          leftIcon={<AntDesign name="lock1" size={24} color="#fff" />}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Input
          style={styles.input}
          label="Confirm Password"
          labelStyle={styles.labels}
          leftIcon={<AntDesign name="lock1" size={24} color="#fff" />}
          value={passwordConfirm}
          onChangeText={(passwordConfirm) =>
            setPasswordConfirm(passwordConfirm)
          }
          onSubmitEditing={handleRegister}
        />
        <Button title="Register!" onPress={handleRegister} />
        <Button
          title="Have an Account!"
          type="clear"
          onPress={() => navigation.navigate('Login')}
          titleStyle={{ ...styles.labels, textDecorationLine: 'underline' }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
    marginTop: 40,
  },
});

export default Register;
