import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect,useRef} from 'react';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Loaders from '../Component/Loader';
let token = '';
let fname = '';
let lname = '';
let mail = '';
let profilepic= '';
const Post = ({navigation}) => {
  const [ImageData, setImageData] = useState(null);
  const [caption, setcaption] = useState('');
  const [visible, setvisible] = useState(false);
  const ClearTextInput = useRef();
 
  

  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    // token = await messaging().getToken();
    fname = await AsyncStorage.getItem('FirstName');
    lname = await AsyncStorage.getItem('LastName');
    mail = await AsyncStorage.getItem('Mail');
    profilepic = await AsyncStorage.getItem('Profile_Pic');
    console.log(fname,lname,mail,profilepic);
    // console.log(profilepic);
    // console.log(token);
  };
  const Opencamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };
  const OpenGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };
  const Uploadimage = async () => {
    let id = uuid.v4();
    const reference = storage().ref(ImageData.assets[0].fileName);
    const pathToFile = ImageData.assets[0].uri;
    const userid = await AsyncStorage.getItem('UserID');
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(ImageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    setvisible(true);
    firestore()
  
      .collection('Post')
      .doc(id)
      .set({
        image: url,
        caption: caption,
        fname: fname,
        lname: lname,
        mail: mail,
        userId: userid,
        postId: id,
        Likes: [],
        Comments: [],
        profilepic:profilepic,
      })
      .then(() => {
        setvisible(false);
        console.log('Post added!');
        navigation.navigate('Home');
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
    ClearTextInput.current.clear();
    
     
  };
  // const RequestPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: "FirebaseSocial App Camera Permission",
  //         message:"FirebaseSocial App needs access to your camera ",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //      RequestPermission();
  //     // Opencamera();
  //     // OpenGallery();
  //     }  else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <View style={{alignSelf: 'center', marginTop: '15%'}}>
        <Text style={{color: 'white', fontSize: 24}}>Create a Post</Text>
      </View>

      <View style={{marginTop: '8%', marginLeft: '8%'}}>
        <Text style={{color: 'white', fontSize: 23}}>Write Caption</Text>
      </View>

      <TextInput
      ref={ClearTextInput}
        value={caption}
        onChangeText={text => {
          setcaption(text);
        }}
        placeholder="Write"
        placeholderTextColor={'grey'}
        style={{
          width: '80%',
          height: h('8%'),
          backgroundColor: '#555555',
          marginLeft: '10%',
          marginTop: '3%',
          borderRadius: 25,
          paddingLeft: 20,
          fontSize: 20,
        }}
      />

      <View
        style={{
          alignSelf: 'center',
          alignItems:'center',
          justifyContent:'center',
          marginTop: '4%',
          width: '70%',
          height: h('30%'),
          backgroundColor: '#000000',
          borderWidth:1.5,
          borderColor:'#FFFFFF',
          borderRadius:10
        }}>
        {ImageData !== null ? (
          <Image
            source={{uri: ImageData.assets[0].uri}}
            style={{width: 230, height: 200, alignItems: 'center'}}
          />
        ) : (
          <View>

          </View>
          // <Image
          //   source={require('../Assets/logo.png')}
          //   style={{width: '60%', height: h('20%')}}
          // />
        )}
      </View>
      <View style={{marginTop: '8%', marginLeft: '8%'}}>
        <Text style={{color: 'white', fontSize: 23}}>Insert image</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          height: h('8%'),
          backgroundColor: '#555555',
          marginLeft: '10%',
          marginTop: '3%',
          borderRadius: 25,
          //   paddingLeft: 20,
          fontSize: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            // RequestPermission();
            Opencamera();
          }}
          style={{
            width: '30%',
            height: h('5%'),
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            // marginLeft:'4%'
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
         
          onPress={() => {
            OpenGallery();
            // RequestPermission();
          }}
          style={{
            width: '30%',
            height: h('5%'),
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginLeft: '2%',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
   
        onPress={() => {
          if (ImageData !== null || caption !== '') {
            Uploadimage();
         
          } else {
            Alert.alert('Plese select pic or enter caption');
          }
        }}
        style={{
          width: '70%',
          height: '6%',
          backgroundColor: ImageData !== null ? '#1eaf60' : '#555555',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          marginLeft: '15%',
          marginTop: '8%',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', letterSpacing: 0.3}}>
          Post
        </Text>
      </TouchableOpacity>
      <Loaders visible={visible}/>
    </View>
  );
};

export default Post;
