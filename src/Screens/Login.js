//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loaders from '../Component/Loader';

// create a component
const Logins = ({navigation}) => {
  const [mail, setmail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setvisible] = useState(false);

  const CheckLogin = () => {
    setvisible(true);
    firestore()
      .collection('Users')
      // Filter results
      .where('mail', '==', mail)
      .get()
      .then(querySnapshot => {
        setvisible(false);
        // console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          if (
            querySnapshot.docs[0]._data.mail === mail &&
            querySnapshot.docs[0]._data.password === password
          ) {
            // Alert.alert('user login successfully');
            gotoHome(
              querySnapshot.docs[0]._data.userid,
              querySnapshot.docs[0]._data.firstname,
              querySnapshot.docs[0]._data.lastname,
              // querySnapshot.docs[0]._data.mail,
              querySnapshot.docs[0]._data.profilepic,
            );
          } else {
            Alert.alert('you entered wrong email && password');
          }
          console.log(
            querySnapshot.docs[0]._data.mail +
              ' ' +
              querySnapshot.docs[0]._data.password,
          );
        } else {
          Alert.alert('account not found');
        }
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };

  const gotoHome = async (userid, firstname,lastname, profilepic) => {
    await AsyncStorage.setItem('UserID', userid);
    await AsyncStorage.setItem('FirstName', firstname);
    await AsyncStorage.setItem('LastName', lastname);
    // await AsyncStorage.setItem('mail', mail);
    await AsyncStorage.setItem('Profile_Pic', profilepic);
    console.log(userid,firstname,lastname,profilepic);

    navigation.navigate('BottomNavigation');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'red',
          marginTop: '30%',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '800',
            color: '#ffff',
            letterSpacing: 0.5,
          }}>
          Login here
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: '15%'}}>
        <Image
          style={{width: '50%', height: h('23%'), borderRadius: 20}}
          source={require('../Assets/logo.png')}
        />
      </View>

      <TextInput
        value={mail}
        onChangeText={text => setmail(text)}
        autoCapitalize={'none'}
        placeholder="Enter your mail"
        placeholderTextColor={'grey'}
        style={{
          marginTop: '10%',
          width: '80%',
          height: h('5%'),
          backgroundColor: '#555555',
          marginLeft: '10%',
          borderRadius: 25,
          paddingLeft: 15,
        }}
      />

      <TextInput
        value={password}
        onChangeText={text => setpassword(text)}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry={true}
        style={{
          marginTop: '5%',
          width: '80%',
          height: h('5%'),
          backgroundColor: '#555555',
          marginLeft: '10%',
          borderRadius: 25,
          paddingLeft: 15,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          CheckLogin();
        }}
        style={{
          marginTop: '5%',
          width: '30%',
          height: h('5%'),
          backgroundColor: '#555555',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 25,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Log in</Text>
      </TouchableOpacity>

      <View style={{alignItems: 'center', marginTop: '6%'}}>
        <Text style={{color: 'white'}}>Don't have account?</Text>
      </View>

      <TouchableOpacity
        style={{alignItems: 'center', marginTop: '6%'}}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{color: 'white'}}>Sign Up</Text>
      </TouchableOpacity>

      <Loaders visible={visible} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
});

//make this component available to the app
export default Logins;
