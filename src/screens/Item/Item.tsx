import {View, Text, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Item = () => {
  return (
    <View
      style={{
        width: '40%',
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
          uri: 'https://robohash.org/Clotilde Predovic.png?size=120x120',
        }}
        style={{width: 120, height: 120}}
      />
      <Text style={{paddingVertical:8, fontSize:16, fontWeight:'600'}}>Clotilde Predovic</Text>
      <Text style={{paddingVertical:8, fontSize:18, color:Colors.primaryColor, fontWeight:'600'}}>LKR 473.96</Text>
    </View>
  );
};

export default Item;
