import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import {StatusBar, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#67db8a'} />

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
              backgroundColor: '#67db8a',
            },
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => navigation.navigate('Add Student')}>
                <Feather name="shopping-cart" size={25} color="#403F3F" />
              </TouchableOpacity>
            ),
          })}
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
