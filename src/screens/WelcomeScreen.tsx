import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);

  const validateEmail = () => {
    let valid = true;
    if (email.length === 0) {
      valid = false;
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      valid = reg.test(email);
    }
    setIsEmailValid(valid);
    return valid;
  };

  const validateName = () => {
    let valid = true;
    if (name.length === 0) {
      valid = false;
    }
    setIsNameValid(valid);
    return valid;
  };
  const renderInputField = (
    placeHolder: string,
    errorMessage: string,
    renderErrorMessage: boolean,
    setValue: Function,
  ) => {
    return (
      <View key={placeHolder}>
        <Input
          labelStyle={styles.inputLabelStyle}
          placeholderTextColor={'#777'}
          containerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyles}
          placeholder={placeHolder}
          errorStyle={styles.inputError}
          errorMessage={!renderErrorMessage ? errorMessage : ''}
          onChangeText={text => {
            setValue(text);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.inputContainer}
          autoCompleteType={undefined}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerScrollView}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>ROBOT MARKET</Text>
          </View>
          <View style={styles.imageView}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.fieldContainer}>
            {renderInputField(
              'Name',
              'The name is required.',
              isNameValid,
              setName,
            )}
            {renderInputField(
              'Email',
              'The email is required.',
              isEmailValid,
              setEmail,
            )}
          </View>
          <View style={styles.loginView}>
            <TouchableOpacity
              onPress={async () => {
                const _email = validateEmail();
                const _name = validateName();
                if (_email && _name) {
                  navigation.navigate('HomeScreen' as never);
                }
              }}
              style={styles.loginButton}>
              <Text style={styles.loginText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginView: {width: '80%', paddingVertical: 10},
  loginButton: {
    height: 45,
    backgroundColor: '#67db8a',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  fieldContainer: {flex: 2, width: '90%', paddingVertical: 20},
  image: {width: 350, height: 250},
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  titleText: {color: '#67db8a', fontSize: 42, fontWeight: '900'},
  title: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  containerScrollView: {
    flex: 1,
  },
  inputContainer: {borderBottomWidth: 0, width: '100%'},
  inputError: {color: 'red', paddingBottom: 10},
  inputStyles: {
    backgroundColor: '#fff',
    borderColor: '#DADADA',
    borderRadius: 4,
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  inputContainerStyle: {overflow: 'hidden'},
  inputLabelStyle: {
    paddingBottom: 1,
    fontWeight: '200',
    color: 'black',
    fontSize: 16,
  },
});

export default WelcomeScreen;
