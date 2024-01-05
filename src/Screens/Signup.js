//import liraries
import React, {useState,useEffect} from 'react';
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
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

let token='';

// create a component
const Signup = ({navigation}) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [mail, setmail] = useState('');
  const [password, setpassword] = useState('');
  const [Show, setShow] = useState('MaleScreen');

  // useEffect(() => {
  //   getFcmToken();
      
  //   }, [])
  
  //   const getFcmToken= async ()=>{
  //     token = await messaging().getToken();
  //     console.log(token);
  //   }
  // const [firstname1, setfirstname1] = useState('');
  // const [lastname1, setlastname1] = useState('');
  // const [mail1, setmail1] = useState('');
  // const [password1, setpassword1] = useState('');
  
  

  const Savedata = () => {
    let id=uuid.v4();
      firestore()
    .collection('Users')
    .doc(id)
    .set({
      firstname:firstname,
      lastname:lastname,
      mail: mail,
      password: password,
      token: token,
      userid: id,
      followers: [],
      following:[],
      posts: [],
      profilepic:'',
      bio: '',
    })
    .then(() => {
      console.log('User added!');
      saveLocalData();
      navigation.goBack();
    });
 };

 const saveLocalData=async () => {
await AsyncStorage.setItem('FName',firstname);
await AsyncStorage.setItem('LName',lastname);
await AsyncStorage.setItem('Mail',mail);
// await AsyncStorage.setItem('Profile_Pic', profilepic);
 }
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'red',
          marginTop: '10%',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '800',
            color: '#ffff',
            letterSpacing: 0.5,
          }}>
          Create Your account
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: '15%'}}>
        <Image
          style={{width: '50%', height: h('23%'), borderRadius: 20}}
          source={require('../Assets/logo.png')}
        />
      </View>

      <View style={{flexDirection: 'row', marginLeft: '15%'}}>
        <TouchableOpacity
          onPress={() => setShow('MaleScreen')}
          style={{
            marginTop: '5%',
            width: '30%',
            height: h('5%'),
            backgroundColor: Show === 'MaleScreen' ? '#1eaf60' : '#555555',
            alignItems: 'center',
            justifyContent: 'center',
            // alignSelf:'center',
            borderRadius: 30,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShow('FemaleScreen')}
          style={{
            marginTop: '5%',
            width: '30%',
            height: h('5%'),
            // backgroundColor: '#555555',
            backgroundColor: Show === 'FemaleScreen' ? '#1eaf60' : '#555555',
            alignItems: 'center',
            justifyContent: 'center',
            // alignSelf:'center',
            borderRadius: 30,
            marginLeft: '15%',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Female</Text>
        </TouchableOpacity>
      </View>
      {(() => {
        if (Show === 'MaleScreen') {
          return (
            <View style={{flex: 1, backgroundColor: '#000000'}}>
              <View>
                <TextInput
                  value={firstname}
                  onChangeText={text => setfirstname(text)}
                  placeholder="First name"
                  placeholderTextColor={'grey'}
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
                <TextInput
                  value={lastname}
                  onChangeText={text => setlastname(text)}
                  placeholder="Last name"
                  placeholderTextColor={'grey'}
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
                <TextInput
                  value={mail}
                  onChangeText={text => setmail(text)}
                  autoCapitalize={'none'}
                  placeholder="Enter your mail"
                  placeholderTextColor={'grey'}
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
              </View>
              <TouchableOpacity
                onPress={() =>{
                  Savedata();
                } }
                style={{
                  marginTop: '5%',
                  width: '30%',
                  height: h('6%'),
                  backgroundColor: '#555555',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 25,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <View style={{alignItems: 'center', marginTop: '5%'}}>
                <Text style={{color: 'white'}}>Already have account?</Text>
              </View>

              <TouchableOpacity
                style={{alignItems: 'center', marginTop: '5%'}}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Log in</Text>
              </TouchableOpacity>
            </View>
          );
        } else if (Show === 'FemaleScreen') {
          return (
            <View style={{flex: 1, backgroundColor: '#000000'}}>
              <View>
                <TextInput
                  value={firstname}
                  onChangeText={text => setfirstname(text)}
                  placeholder="First name"
                  placeholderTextColor={'grey'}
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
                <TextInput
                  value={lastname}
                  onChangeText={text => setlastname(text)}
                  placeholder="Last name"
                  placeholderTextColor={'grey'}
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
                <TextInput
                  value={mail}
                  onChangeText={text => setmail(text)}
                  autoCapitalize={'none'}
                  placeholder="Enter your mail"
                  placeholderTextColor={'grey'}
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
              </View>
              <TouchableOpacity
                onPress={() => {
                  Savedata();
                }}
                style={{
                  marginTop: '5%',
                  width: '30%',
                  height: h('6%'),
                  backgroundColor: '#555555',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 25,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <View style={{alignItems: 'center', marginTop: '5%'}}>
                <Text style={{color: 'white'}}>Already have account?</Text>
              </View>

              <TouchableOpacity
                style={{alignItems: 'center', marginTop: '5%'}}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Log in</Text>
              </TouchableOpacity>
            </View>
          );
        }
      })()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#000000',
  },
});

//make this component available to the app
export default Signup;
