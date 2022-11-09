import {View, Text, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Item from './Item/Item';
import {getRobotList, Robot} from '../redux/actions/item';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux/reducers';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ItemDetail from './Item/ItemDetail';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({} as Robot);
  const [modalVisible, setModalVisible] = useState(false);
  const robotList = useSelector((state: ApplicationState) => {
    return state.robots.robotList as Robot[];
  });
  useEffect(() => {
    dispatch(getRobotList());
  }, []);
  // console.log('redux: ', robotList.data[1].name);

  const renderItem = (item: {item: Robot; index: any}) => {
    const robot = item.item;
    return (
      <Item
        onTouch={() => {
          setItemData(robot);
          setModalVisible(!modalVisible);
        }}
        name={robot.name}
        price={robot.price}
        url={robot.image}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={robotList.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        horizontal={false}
        numColumns={2}
      />
      {/* <Item
        name={robotList.data[1].name}
        price={robotList.data[1].price}
        url={robotList.data[1].image}
      /> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
        }}>
        <ItemDetail
          item={itemData}
          onClose={() => setModalVisible(!modalVisible)}
        />
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1, backgroundColor: '#fff'},
});
