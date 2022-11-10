import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
import {ApplicationState} from '../redux/reducers';
import {useSelector} from 'react-redux';
import {Text} from 'react-native-elements';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const cart = useSelector((state: ApplicationState) => {
    return state.robots.cart;
  });

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          options={({navigation}) => ({
            title: 'Store',
            headerTitleStyle: {color: '#403F3F', fontSize: 24},
            headerShown: true,
            headerTintColor: '#fff',
            headerLeft: () => <></>,
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => navigation.navigate('CartScreen')}>
                {cart.length > 0 && (
                  <View style={styles.itemCount}>
                    <Text style={styles.count}>{cart.length}</Text>
                  </View>
                )}
                <Feather name="shopping-cart" size={25} color="#403F3F" />
              </TouchableOpacity>
            ),
          })}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: 'Cart',
            headerTitleStyle: {color: Colors.secondaryColor, fontSize: 24},
            headerShown: true,
            headerTintColor: Colors.secondaryColor,

            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  count: {fontSize: 12, color: Colors.secondaryColor},
  itemCount: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 18,
    height: 18,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: -6,
    right: -9,
  },
});
