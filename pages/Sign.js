import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import {authStyle} from './styles';
import {Input, Button} from '../components';
import auth from '@react-native-firebase/auth';

const Sign = (props) => {
  // Daha az state, daha optimal bir yapı kurulabilir mi?
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    password_first: '',
    password_second: '',
  });

  const handleChange1 = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      password_first: e,
    }));
  };
  const handleChange2 = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      password_second: e,
    }));
  };

  function passwordMatch(txt) {
    if (password.password_first.indexOf(txt) === txt.indexOf(txt)) {
      return true;
    } else {
      // Alert.alert('ClarusChat', 'Passwords are not match');
      return false;
    }
  }

  async function sign() {
    // Geçerli e-posta ve doğru değer kontrolü? (REGEX)
    if (password.password_first === password.password_second) {
      try {
        await auth().createUserWithEmailAndPassword(
          email,
          password.password_first,
        );
        props.navigation.navigate('Login');
      } catch (error) {
        Alert.alert('ClarusChat', 'An error occured');
      }
    } else {
      Alert.alert('ClarusChat', 'Passwords are not match');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#cfd8dc'}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={authStyle.container}>
            <Image
              style={authStyle.logo}
              source={require('../assets/logo.jpeg')}
            />
            <Text style={authStyle.logoText}>ClarusChat</Text>
          </View>
          <View style={{flex: 1}}>
            <Input
              inputProps={{
                placeholder: 'Type your e-mail address..',
                keyboardType: 'email-address',
              }}
              onType={(value) => setEmail(value)}
            />
            <Input
              inputProps={{
                placeholder: 'Type your password..',
                secureTextEntry: true,
              }}
              onType={(val) => handleChange1(val)}
            />
            {passwordMatch(password.password_second) ? (
              <Input
                inputProps={{
                  placeholder: 'Type your password again..',
                  secureTextEntry: true,
                }}
                onType={(value) => {
                  handleChange2(value);
                  passwordMatch(value);
                }}
              />
            ) : (
              <Input
                inputProps={{
                  placeholder: 'Type your password again..',
                  secureTextEntry: true,
                }}
                onType={(value) => {
                  handleChange2(value);
                  passwordMatch(value);
                }}
                redBorder={{borderWidth: 1, borderColor: 'red'}}
              />
            )}
            <Button title="Create account" onPress={() => sign()} />
            <Button
              title="Cancel"
              noBorder
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export {Sign};
