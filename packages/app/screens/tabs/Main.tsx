import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { useItemStore } from '../../lib/items.store';

const Main = () => {
  const items = useItemStore((s) => s.items);
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
      <ScrollView>
        {items.length ? (
          items.map((item) => (
            <View key={item.id}>
              <Text>{item.name}</Text>
            </View>
          ))
        ) : (
          <View style={styles.noItemsWrapper}>
            <Text style={styles.noItemTxt}>No items yet!</Text>
          </View>
        )}
      </ScrollView>
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
  noItemsWrapper: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#442BAA',
    marginTop: 20,
  },
  noItemTxt: {
    color: '#D6D1E8',
  },
});
export default Main;
