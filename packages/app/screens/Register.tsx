import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useLayoutEffect, useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { useInventoryLocationStore } from '../lib/inventoryLocation.store';
import RNPickerSelect from 'react-native-picker-select';
import { ax } from '../lib/axios';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Register: FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inventory_location_id, setInventoryLocationId] = useState(1);
  const inventories = useInventoryLocationStore((s) => s.inventories);

  const handleRegister = async () => {
    setLoading(true);
    if (password === passwordConfirm) {
      const { data } = await ax.post<{
        user: UserType;
        token: string;
        success: boolean;
      }>('/auth/signup', {
        username,
        email,
        password,
        inventory_location_id,
      });

      if (data.success && data.token) {
        // ! save the token in Storage
        // set all state to ''
        setUsername('');
        setPassword('');
        setEmail('');
        setPasswordConfirm('');
        setInventoryLocationId(1);
        setLoading(false);
        navigation.navigate('Home');
      }
    } else {
      alert("Your Confirmed password doesn't match to you original password");
      setLoading(false);
    }
  };

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
        <View style={{ marginBottom: 15 }}>
          <View
            style={{ ...styles.input, flexDirection: 'row', marginBottom: 5 }}
          >
            <FontAwesome name="globe" size={24} color="#fff" />
            <Text style={{ ...styles.labels, marginLeft: 5, fontSize: 16 }}>
              Inventory Location
            </Text>
          </View>
          <RNPickerSelect
            value={inventory_location_id}
            style={{
              placeholder: {
                color: '#bcbec1',
                fontWeight: 'bold',
              },
              inputAndroid: { color: '#fff', fontWeight: 'bold' },
              inputIOS: { color: '#fff', fontWeight: 'bold' },
              inputWeb: { color: '#fff', fontWeight: 'bold' },
            }}
            useNativeAndroidPickerStyle
            onValueChange={(iv) => setInventoryLocationId(iv)}
            items={inventories.map((i) => ({
              label: i.location,
              value: i.id,
              key: i.id,
            }))}
          />
        </View>
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
        <Button
          title="Register!"
          loading={loading}
          disabled={
            !username ||
            !password ||
            !passwordConfirm ||
            !email ||
            !inventory_location_id
          }
          onPress={handleRegister}
        />
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
