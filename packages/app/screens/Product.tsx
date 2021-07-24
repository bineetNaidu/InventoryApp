import React, { FC, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Product'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Product: FC<Props> = ({ navigation }) => {
  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text h1 style={styles.header}>
        InventoryApp
      </Text>
      <Button
        containerStyle={styles.btn}
        raised
        titleStyle={styles.btnText}
        title="Go to Login!"
        onPress={handleNavigateToLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { color: '#fff' },
  btn: {
    margin: 20,
    borderRadius: 9,
  },
  btnText: {
    padding: 10,
  },
});

export default Product;
