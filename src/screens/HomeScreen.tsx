import {View, Text} from 'react-native';
import React from 'react';
import Item from './Item/Item';
import {getRobotList} from '../redux/actions/item';
import {useDispatch} from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  // console.log(getRobotList());
  dispatch(getRobotList());

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Item />
    </View>
  );
};

export default HomeScreen;
