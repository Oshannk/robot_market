import {View, Text} from 'react-native';
import React from 'react';

const WelcomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'red'}}>WelcomeScreen</Text>
    </View>
  );
};

export default WelcomeScreen;
