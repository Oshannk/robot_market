import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ApplicationState} from '../redux/reducers';
import {useSelector} from 'react-redux';
import {Cart} from '../redux/actions/item';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import moment from 'moment';

const CartScreen = () => {
  const cart = useSelector((state: ApplicationState) => {
    return state.robots.cart;
  });

  const Item = (item: {item: Cart; index: any}) => {
    // const [stock, setStock] = useState(item.item.stock);
    // const [quantity, setQuantity] = useState(item.item.qty);
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
              onPress={() => {
                console.log(moment(item.item.createdAt).format('DD-MM-YYYY'));
              }}
              title={
                <Feather name="minus" size={10} color={Colors.secondaryColor} />
              }
            />
            <View style={styles.quantity}>
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
        <View style={styles.deleteButton}>
          <Feather name="trash-2" size={30} color="red" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 35, paddingTop: 20}}
        showsVerticalScrollIndicator={false}
        data={cart}
        renderItem={Item}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  quantity: {
    backgroundColor: '#eee',
    width: 50,
    height: 28,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {width: '25%', justifyContent: 'center', alignItems: 'center'},
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
    elevation: 5,
  },
  btnContainer: {
    elevation: 5,
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
