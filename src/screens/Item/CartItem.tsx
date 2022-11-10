import {View, Text, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import { Cart } from '../../redux/actions/item';
import { Button } from 'react-native-elements';


const CartItem = (item: {item: Cart; index: any}) => {
  const [stock, setStock] = useState(item.item.stock);
  const [quantity, setQuantity] = useState(item.item.qty);
  const getTotal = item => {
    return (
      Math.round(Number(item.item.price) * Number(item.item.qty) * 100) / 100
    ).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={{width: '25%', paddingRight: 2}}>
        <Image
          source={{
            uri: item.item.image,
          }}
          style={{width: '100%', height: 80}}
        />
      </View>

      <View style={{width: '50%'}}>
        <View style={{padding: 2}}>
          <Text style={{color: Colors.secondaryColor, fontSize: 16}}>
            {item.item.name}
          </Text>
        </View>
        <View style={{padding: 1}}>
          <Text style={{color: Colors.secondaryColor, fontSize: 12}}>
            {'Quantity: ' + item.item.qty}
          </Text>
        </View>
        {/* <View style={{padding: 1}}>
              <Text style={{color: Colors.secondaryColor, fontSize: 12}}>
                {'Stock: ' + item.item.stock}
              </Text>
            </View> */}
        <View style={{padding: 1}}>
          <Text style={{color: Colors.secondaryColor, fontSize: 12}}>
            {'Total price: LKR ' + getTotal(item)}
          </Text>
        </View>
        <View style={{padding: 10, flexDirection: 'row'}}>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title={
              <Feather name="minus" size={10} color={Colors.secondaryColor} />
            }
          />
          <View
            style={{
              backgroundColor: '#eee',
              width: 50,
              height: 28,
              marginHorizontal: 10,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{'1'}</Text>
          </View>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title={
              <Feather name="plus" size={10} color={Colors.secondaryColor} />
            }
          />
        </View>
      </View>
      <View
        style={{
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Close</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  btnContainer: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
});

export default CartItem;
