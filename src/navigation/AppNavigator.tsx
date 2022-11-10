import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import {StatusBar, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
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
