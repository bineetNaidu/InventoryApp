import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Main Tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
  },
});
export default Main;
