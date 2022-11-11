import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ApplicationState} from '../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {Cart, Robot} from '../redux/actions/item';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import {GET_CART, GET_ROBOTS} from '../constants/apiConst';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CartScreen = () => {
  const cart = useSelector((state: ApplicationState) => {
    return state.robots.cart;
  });
  const [noItems, setNoItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const CartItem: React.FC<{item: Cart}> = item => {
    const robotList = useSelector((state: ApplicationState) => {
      return state.robots.robotList as Robot[];
    });
    const dispatch = useDispatch();

    const [stock, setStock] = useState(item.item.stock);
    const [quantity, setQuantity] = useState(item.item.qty);

    const getTotal = (itm: {item: any}) => {
      return (
        Math.round(Number(itm.item.price) * quantity * 100) / 100
      ).toFixed(2);
    };

    const updateStock = (st: number, qty: number) => {
      const robotItem = robotList.map(x => {
        if (x.id === item.item.id) {
          return {...item.item, stock: st};
        } else {
          return x;
        }
      });

      dispatch({
        type: GET_ROBOTS,
        payload: robotItem,
      });

      const cartItem = cart.map((x: any) => {
        if (x.id === item.item.id) {
          return {
            ...item.item,
            qty: qty,
            stock: st,
            total: (
              Math.round(Number(item.item.price) * qty * 100) / 100
            ).toFixed(2),
          };
        } else {
          return x;
        }
      });

      dispatch({
        type: GET_CART,
        payload: cartItem,
      });
    };

    const AddQty = () => {
      if (stock > 0) {
        setStock(stock - 1);
        setQuantity(quantity + 1);
        updateStock(stock - 1, quantity + 1);
      }
    };

    const MinQty = () => {
      if (quantity > 1) {
        setStock(stock + 1);
        setQuantity(quantity - 1);
        updateStock(stock + 1, quantity - 1);
      }
    };

    const DeleteCartItem = () => {
      setNoItems(0);
      setSubTotal(0);

      const robotItem = robotList.map(x => {
        if (x.id === item.item.id) {
          return {...item.item, stock: x.stock + quantity};
        } else {
          return x;
        }
      });

      dispatch({
        type: GET_ROBOTS,
        payload: robotItem,
      });

      const leftItems = cart.filter((x: any) => x.id !== item.item.id);

      dispatch({
        type: GET_CART,
        payload: leftItems,
      });
      console.log(cart);
    };

    useEffect(() => {
      let totalItems = 0;
      let total = 0;
      cart.forEach((e: Cart) => {
        totalItems = totalItems + e.qty;
        total = Number(total) + Number(e.total);
      });

      setNoItems(totalItems);
      setSubTotal(total);
      console.log('test ', totalItems);
    }, [quantity]);

    return (
      <View style={styles.container}>
        <View style={styles.imgView}>
          <Image
            source={{
              uri: item.item.image,
            }}
            style={styles.img}
          />
        </View>

        <View style={styles.middlePart}>
          <View style={styles.itemNameView}>
            <Text style={styles.itemName}>{item.item.name}</Text>
          </View>
          <View style={styles.stockView}>
            <Text style={styles.stock}>{'Stock: ' + stock}</Text>
          </View>
          {/* <View style={{padding: 1}}>
            <Text style={{color: Colors.secondaryColor, fontSize: 12}}>
              {'Stock: ' + item.item.stock}
            </Text>
          </View> */}
          <View style={styles.totalView0}>
            <Text style={styles.total0}>
              {'Total price: LKR ' + getTotal(item)}
            </Text>
          </View>
          <View style={styles.qtyArea}>
            <Button
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainer}
              onPress={MinQty}
              title={
                <Feather name="minus" size={10} color={Colors.secondaryColor} />
              }
            />
            <View style={styles.quantity}>
              <Text>{quantity}</Text>
            </View>
            <Button
              onPress={AddQty}
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainer}
              title={
                <Feather name="plus" size={10} color={Colors.secondaryColor} />
              }
            />
          </View>
        </View>
        <View style={styles.deleteButton}>
          <TouchableOpacity onPress={DeleteCartItem}>
            <Feather name="x" size={30} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.listWidth}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={cart}
        extraData={cart}
        renderItem={({item}) => <CartItem item={item} />}
        keyExtractor={(item, index) => String(index)}
      />
      <View style={styles.bottomView}>
        <Text style={styles.noItems}>{'Items: ' + noItems}</Text>
        <Text style={styles.totalText}>
          {'LKR ' + Number(subTotal).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  listContent: {paddingHorizontal: 35, paddingTop: 20, paddingBottom: 80},
  listWidth: {width: '100%'},
  qtyArea: {padding: 10, flexDirection: 'row'},
  total0: {color: Colors.secondaryColor, fontSize: 12},
  totalView0: {padding: 1},
  stock: {color: Colors.secondaryColor, fontSize: 12},
  stockView: {padding: 1},
  itemName: {color: Colors.secondaryColor, fontSize: 16},
  itemNameView: {padding: 2},
  middlePart: {width: '50%', justifyContent: 'center', paddingHorizontal: 10},
  img: {width: '100%', height: 80},
  imgView: {width: '25%', paddingRight: 2},
  totalText: {color: Colors.secondaryColor, fontSize: 18, fontWeight: '500'},
  noItems: {color: Colors.secondaryColor, fontSize: 18, fontWeight: '500'},
  bottomView: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
  },
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
