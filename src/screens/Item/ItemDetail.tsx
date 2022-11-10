import {View, Text, Image, StyleSheet, Modal} from 'react-native';
import React, {useState} from 'react';
import {Robot} from '../../redux/actions/item';
import {Button} from 'react-native-elements';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_TO_CART, GET_CART, GET_ROBOTS} from '../../constants/apiConst';
import {ApplicationState} from '../../redux/reducers';

const ItemDetail = (props: {item: Robot; onClose: () => void}) => {
  const dispatch = useDispatch();
  const {item, onClose} = props;
  const [stock, setStock] = useState(item.stock);
  const [quantity, setQuantity] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);

  const robotList = useSelector((state: ApplicationState) => {
    return state.robots.robotList as Robot[];
  });

  const cart = useSelector((state: ApplicationState) => {
    return state.robots.cart;
  });

  const AddToCartText = () => {
    return (
      <>
        <Feather name="shopping-cart" size={20} color={Colors.secondaryColor} />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </>
    );
  };

  const AddQty = () => {
    if (stock > 0) {
      setStock(stock - 1);
      setQuantity(quantity + 1);
    }
  };

  const MinQty = () => {
    if (stock < item.stock) {
      setStock(stock + 1);
      setQuantity(quantity - 1);
    }
  };

  const AddToCart = () => {
    
    const cartIndex = cart.findIndex((x: any) => x.id === item.id);
    console.log('cartIndex', cartIndex);

    if (cartIndex > -1) {
      cart[cartIndex] = {...item, qty: cart[cartIndex]?.qty + quantity};
      // console.log('cart',cart);

      dispatch({
        type: GET_CART,
        payload: cart,
      });
    } else {
      if (cart.length >= 5) {
        setErrorMsg(true);
        setTimeout(() => {
          setErrorMsg(false);
        }, 2000);
        return;
      }
      console.log('test return');

      console.log('quantity', quantity);
      console.log('stock', stock);

      dispatch({
        type: ADD_TO_CART,
        payload: {...item, qty: quantity, stock: stock},
      });
    }

    const robotIndex = robotList.findIndex(x => x.id === item.id);
    robotList[robotIndex] = {...item, stock: stock};
    dispatch({
      type: GET_ROBOTS,
      payload: robotList,
    });
    // console.log('cart', cart);
    onClose();
  };

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <View style={styles.closeView}>
          <Button
            title={<Feather name="x" size={20} color="#fff" />}
            buttonStyle={styles.closeButton}
            onPress={onClose}
          />
        </View>

        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
        <View style={styles.firstRow}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.date}>{item.createdAt}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.label1}>{'material:  '}</Text>
          <Text style={styles.material}>{item.material}</Text>
        </View>
        <View style={styles.thirdRow}>
          <Text style={styles.label2}>{'Stock:  '}</Text>
          <Text style={styles.stock}>{stock}</Text>
        </View>
        <View style={styles.forthRow}>
          <Button
            title={
              <Feather name="minus" size={20} color={Colors.secondaryColor} />
            }
            onPress={() => MinQty()}
            buttonStyle={styles.minusButton}
            containerStyle={styles.minusContainer}
          />
          <View style={styles.quantityView}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
          <Button
            title={
              <Feather name="plus" size={20} color={Colors.secondaryColor} />
            }
            onPress={() => AddQty()}
            buttonStyle={styles.minusButton}
            containerStyle={styles.minusContainer}
          />
        </View>
        <View style={styles.fifthRow}>
          <View style={styles.priceView}>
            <Text style={styles.price}>{'LKR ' + item.price}</Text>
          </View>
          <View style={styles.addToCartView}>
            <Button
              title={<AddToCartText />}
              onPress={AddToCart}
              disabled={quantity === 0 || (quantity === 0 && stock === 0)}
              buttonStyle={styles.addToCartButton}
              containerStyle={styles.addToCartContainer}
            />
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={errorMsg}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            // setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#B3351D',
              height: 30,
            }}>
            <Text style={{color: '#fff'}}>
              Sorry! you reached maximum limit! (Max: 5)
            </Text>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  addToCartText: {color: Colors.secondaryColor, fontSize: 16, paddingLeft: 10},
  addToCartView: {
    width: '60%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  price: {fontSize: 20, color: Colors.primaryColor, fontWeight: '500'},
  priceView: {width: '40%', justifyContent: 'flex-start'},
  fifthRow: {
    width: '85%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  quantityText: {fontSize: 15, color: Colors.secondaryColor},
  quantityView: {
    backgroundColor: '#eee',
    width: 80,
    height: 32,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addToCartButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    alignItems: 'flex-end',
    width: 140,
  },
  addToCartContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  minusContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  stock: {fontSize: 14, fontWeight: '500', color: Colors.secondaryColor},
  label2: {fontSize: 12, fontWeight: '400'},
  thirdRow: {width: '85%', flexDirection: 'row', alignItems: 'baseline'},
  material: {fontSize: 14, fontWeight: '500', color: Colors.secondaryColor},
  label1: {fontSize: 12, fontWeight: '400'},
  secondRow: {width: '85%', flexDirection: 'row', alignItems: 'baseline'},
  date: {fontSize: 14, fontWeight: '400'},
  dateView: {width: '40%', alignItems: 'flex-end'},
  titleText: {fontSize: 18, fontWeight: '500', color: Colors.secondaryColor},
  titleView: {width: '60%', alignItems: 'flex-start'},
  firstRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '85%',
    paddingVertical: 5,
  },
  closeView: {alignItems: 'flex-end', width: '90%', paddingVertical: 20},
  image: {width: 220, height: 220},
  closeButton: {
    backgroundColor: '#888',
    borderRadius: 20,
    alignItems: 'flex-end',
  },
  minusButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
  container: {
    width: 310,
    backgroundColor: '#fff',
    shadowColor: '#000',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  back: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.4)',
  },
});
