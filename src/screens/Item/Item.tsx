import {View, Text, Image} from 'react-native';
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
    <TouchableOpacity
      onPress={onTouch}
      style={{
        width: 155,
        height: 220,
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
      }}>
      <Image
        source={{
          uri: url,
        }}
        style={{width: 120, height: 120}}
      />
      <Text style={{paddingVertical: 8, fontSize: 16, fontWeight: '600'}}>
        {name}
      </Text>
      <Text
        style={{
          paddingVertical: 8,
          fontSize: 18,
          color: Colors.primaryColor,
          fontWeight: '600',
        }}>
        {'LKR ' + price}
      </Text>
    </TouchableOpacity>
  );
};

export default Item;
