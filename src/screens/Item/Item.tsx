import {Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = (props: {
  onTouch: () => void;
  name: any;
  price: any;
  url: any;
}) => {
  const {onTouch, name, price, url} = props;

  return (
    <TouchableOpacity onPress={onTouch} style={styles.buttonContainer}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>{'LKR ' + price}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  title: {paddingVertical: 8, fontSize: 16, fontWeight: '600'},
  image: {width: 120, height: 120},
  price: {
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.primaryColor,
    fontWeight: '600',
  },
  buttonContainer: {
    width: 155,
    height: 230,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
