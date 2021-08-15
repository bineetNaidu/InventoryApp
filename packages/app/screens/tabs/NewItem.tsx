import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Input, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useItemTypesStore } from '../../lib/itemsTypes.store';
import { useManufacturersStore } from '../../lib/manufacturers.store';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ax } from '../../lib/axios';
import { useItemStore } from '../../lib/items.store';

type NewItemTabNavigationProp = StackNavigationProp<
  RootTabParamList,
  'NewItem'
>;

type Props = {
  navigation: NewItemTabNavigationProp;
};

const NewItem: FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchase_location, setPurchaseLocation] = useState('');
  const [info, setInfo] = useState('');
  const [item_type_id, setItemTypeId] = useState(1);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [expiration_date, setExpirationDate] = useState('');
  const [sku, setSku] = useState('');
  const [manufacturer_id, setManufacturerId] = useState(1);
  const itemsTypes = useItemTypesStore((s) => s.itemsTypes);
  const manufacturers = useManufacturersStore((s) => s.manufacturers);
  const addItem = useItemStore((s) => s.addItem);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setExpirationDate(date.toUTCString());
    hideDatePicker();
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@InventoryAppToken');
      if (!token) {
        alert('Please Login');
        navigation.navigate('Main');
        return;
      }
      const { data } = await ax.post<{
        item: ItemsType;
        success: boolean;
      }>(
        '/items',
        {
          name,
          info,
          price: parseInt(price),
          expiration_date,
          purchase_location,
          sku,
          manufacturer_id,
          item_type_id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(data);
      if (data.success) {
        addItem(data.item);
        setLoading(false);
        setName('');
        setInfo('');
        setPrice('');
        setPurchaseLocation('');
        setSku('');
        setManufacturerId(1);
        setItemTypeId(1);
        setExpirationDate('');
        navigation.navigate('Main');
      }
    } catch (err) {
      console.error(err.message);
      alert('Opps! Something Went Wrong while creating the Item');
      setLoading(false);
    }
  };

  const isSubmitBtnDisabled =
    !name ||
    !info ||
    !price ||
    !expiration_date ||
    !manufacturer_id ||
    !item_type_id;

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
              value={item_type_id}
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
              onValueChange={(item_type) => setItemTypeId(item_type)}
              items={itemsTypes.map((it) => ({
                label: it.name,
                value: it.id,
              }))}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ ...styles.label, marginLeft: 7, marginBottom: 10 }}>
              Choose Manufacturer
            </Text>
            <RNPickerSelect
              value={manufacturer_id}
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
              onValueChange={(manufacturer_id) =>
                setManufacturerId(manufacturer_id)
              }
              items={manufacturers.map((m) => ({
                label: m.name,
                value: m.id,
              }))}
            />
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.footer}>
            <Button
              title="Select The Expiration Date"
              onPress={showDatePicker}
            />
            <Button
              title="Add Item!"
              disabled={isSubmitBtnDisabled}
              loading={loading}
              raised
              onPress={handleAddItem}
            />
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
