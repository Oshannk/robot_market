import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Robot} from '../../redux/actions/item';
import {Button} from 'react-native-elements';
import Colors from '../../constants/Colors';

const ItemDetail = (props: {item: Robot; onClose: () => void}) => {
  const {item, onClose} = props;
  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <View style={styles.closeView}>
          <Button
            title="Close"
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
        <Text style={{fontSize:30,fontWeight:'600'}}>{item.name}</Text>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  closeView: {alignItems: 'flex-end', width: '80%'},
  image: {width: 250, height: 250},
  closeButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
  container: {
    width: 300,
    height: 500,
    backgroundColor: '#fff',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,

      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
  back: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,    100,    100,    0.4)',
  },
});
