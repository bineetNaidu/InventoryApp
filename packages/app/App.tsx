import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Text h1 style={{ color: '#fff' }}>
        InventoryApp
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
