import {View, Text, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Item from './Item/Item';
import {getRobotList, Robot} from '../redux/actions/item';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux/reducers';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ItemDetail from './Item/ItemDetail';
import {BottomSheet, ListItem} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({} as Robot);
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('Choose a Material');
  const [materialList, setMaterialList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const robotList = useSelector((state: ApplicationState) => {
    return state.robots.robotList as Robot[];
  });
  useEffect(() => {
    dispatch(getRobotList());
  }, []);

  useEffect(() => {
    const fList = robotList.filter(e => e.material === selectedMaterial);
    setFilteredList(fList);
  }, [selectedMaterial, robotList]);

  useEffect(() => {
    let materials = robotList.map(ele => {
      return ele.material;
    });
    function onlyUnique(value: any, index: any, self: string | any[]) {
      return self.indexOf(value) === index;
    }
    let uniqueMaterials: any[] = materials.filter(onlyUnique);
    setMaterialList(uniqueMaterials);
  }, [robotList]);

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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setSheetVisible(true)}
          style={styles.dropDown}>
          <Text>{selectedMaterial}</Text>
          <Feather name="chevron-down" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedMaterial('Choose a Material');
            setFilteredList;
          }}
          style={styles.clear}>
          <Feather name="x" size={30} color="#ccc" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredList.length > 0 ? filteredList : robotList}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        horizontal={false}
        numColumns={2}
      />
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
      <BottomSheet
        isVisible={sheetVisible}
        containerStyle={styles.bottomSheetContainer}>
        {materialList.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={{}}
            onPress={() => {
              setSelectedMaterial(l);
              setSheetVisible(false);
            }}>
            <ListItem.Content
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <ListItem.Title>{l}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  clear: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  dropDown: {
    backgroundColor: '#fff',
    height: 40,
    width: 300,
    marginTop: 20,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  bottomSheetContainer: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
