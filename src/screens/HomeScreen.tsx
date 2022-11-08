import {View, Text} from 'react-native';
import React from 'react';
import Item from './Item/Item';

const HomeScreen = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff'
      }}>
      <Item />
    </View>
  );
};

export default HomeScreen;
