import React, { FC, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Input, Button, Switch } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

type NewItemTabNavigationProp = StackNavigationProp<
  RootTabParamList,
  'NewItem'
>;

type Props = {
  navigation: NewItemTabNavigationProp;
};

const NewItem: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [has_warranty, setHasWarranty] = useState(false);
  const [purchase_location, setPurchaseLocation] = useState('');
  const [info, setInfo] = useState('');
  const [item_type, setItemType] = useState('inventory');
  const [manufacturer, setManufacturer] = useState('');

  const handleAddItem = useCallback(async () => {
    navigation.navigate('Main');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <ScrollView>
          <Input
            style={styles.input}
            labelStyle={styles.label}
            label="name"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <Input
            style={styles.input}
            labelStyle={styles.label}
            label="price"
            keyboardType="numeric"
            value={price}
            onChangeText={(price) => setPrice(price)}
          />

          <Input
            style={styles.input}
            labelStyle={styles.label}
            label="purchase_location"
            value={purchase_location}
            onChangeText={(purchase_location) =>
              setPurchaseLocation(purchase_location)
            }
          />
          <Input
            style={styles.input}
            labelStyle={styles.label}
            label="info"
            value={info}
            onChangeText={(info) => setInfo(info)}
          />
          <View style={{ marginBottom: 20 }}>
            <Text style={{ ...styles.label, marginLeft: 7, marginBottom: 10 }}>
              Choose Item Type
            </Text>
            <RNPickerSelect
              value={item_type}
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
              onValueChange={(item_type) => setItemType(item_type)}
              items={[
                { label: 'Inventory', value: 'inventory' },
                { label: 'NonInventory', value: 'non-inventory' },
                { label: 'Service', value: 'service' },
              ]}
            />
          </View>

          <Input
            style={styles.input}
            labelStyle={styles.label}
            label="manufacturer"
            value={manufacturer}
            onChangeText={(manufacturer) => setManufacturer(manufacturer)}
            onSubmitEditing={handleAddItem}
          />

          <View style={styles.footer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#fff', marginRight: 5 }}>
                Has Warranty?
              </Text>
              <Switch
                value={has_warranty}
                onValueChange={(has_warranty) => setHasWarranty(has_warranty)}
              />
            </View>

            <Button title="Add Item!" raised onPress={handleAddItem} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  input: {
    width: 100,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
});

export default NewItem;
