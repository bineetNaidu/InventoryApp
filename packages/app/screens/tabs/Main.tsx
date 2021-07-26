import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterBtn}>
          <AntDesign name="API" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt} h3>
          Your Items
        </Text>
      </View>
      <ScrollView>{/* the Items */}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4FD3',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#442BAA',
  },
  headerTxt: {
    color: '#D6D1E8',
  },
});
export default Main;
