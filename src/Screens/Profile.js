import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// let firstname = '';
// let lastname = '';
let userid = '';
const Profile = ({navigation}) => {
  const [ImageData, setImageData] = useState(null);
  const [ImagePicked, setImagePicked] = useState(false);
  const [uploadPicurl, setuploadPicurl] = useState('');
  const [sleectedTab, setsleectedTab] = useState(0);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  useEffect(() => {
    GetProfileData();
    //  getUserId();
  }, []);

  // const getUserId = async () => {
  //   // userId = await AsyncStorage.getItem('UserID');
  //   firstname = await AsyncStorage.getItem('FirstName');
  //   lastname = await AsyncStorage.getItem('LastName');
  //   // profilepic = await AsyncStorage.getItem('Profile_Pic');
  // };

  const GetProfileData = async () => {
    const userid = await AsyncStorage.getItem('UserID');
    firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setuploadPicurl(documentSnapshot.data().profilepic);
          setfollowers(documentSnapshot.data().followers);
          setfollowing(documentSnapshot.data().following);
          console.log(documentSnapshot.data().followers);
        }
      });
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

  const UploadProfilePicture = async () => {
    const userid = await AsyncStorage.getItem('UserID');
    const reference = storage().ref(ImageData.assets[0].fileName);
    const pathToFile = ImageData.assets[0].uri;
    await reference.putFile(pathToFile);

    const url = await storage()
      .ref(ImageData.assets[0].fileName)
      .getDownloadURL();

    firestore()
      .collection('Users')
      .doc(userid)
      .update({
        profilepic: url,
      })
      .then(() => {
        console.log('Profile updated!');
      })
      .catch(error => {});
  };

  const getFollowStatus = followers => {
    let status = false;

    followers.map(item => {
      if (item.userid == userid) {
        status = true;
      } else {
        status = false;
      }
    });
    return status;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <View
        style={{
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#8e8e8e',
          alignItems: 'center',
          //  justifyContent:'center'
        }}>
        <Text
          style={{
            marginTop: '6%',
            marginLeft: 25,
            fontSize: 20,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
          Profile
        </Text>
      </View>

      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginTop: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Image
            source={{uri: uploadPicurl}}
            style={{width: 100, height: 100, borderRadius: 50}}
          /> */}
        {/* {ImagePicked == false && uploadPicurl === ''? (
            <Image
            source={require('../Assets/profile1.png')}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          ) : ImagePicked === true ? (
            <Image
            source={{uri: ImageData.assets[0].uri}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          ) : uploadPicurl !=='' ? (
            <Image
            source={{uri: uploadPicurl}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />

          ): (
            <Image
            source={{uri: ImageData.assets[0].uri}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          )} */}
        {ImagePicked == true ? (
          ImageData && ImageData.assets ? (
            <Image
              source={{uri: ImageData.assets[0].uri}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          ) : (
            <Text>Error: No image data</Text>
          )
        ) : uploadPicurl === '' ? (
          <Image
            source={require('../Assets/profile1.png')}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        ) : (
          <Image
            source={{uri: uploadPicurl}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        )}

        {/* {ImagePicked == true ?  (
  <Image
  source={{ uri:  ImageData.assets[0].uri }}
  style={{ width: 100, height: 100, borderRadius: 50 }}
/>
    
  
) : uploadPicurl === '' ? (
  <Image
    source={require('../Assets/profile1.png')}
    style={{ width: 100, height: 100, borderRadius: 50 }}
  />
) : (
  <Image
    source={{ uri: uploadPicurl }}
    style={{ width: 100, height: 100, borderRadius: 50 }}
  />
)} */}
      </TouchableOpacity>
      {/* <Text style={{color:'#FFFFFF',fontSize:18}}>{item.firstname}</Text> */}
      <TouchableOpacity
        style={{
          width: 200,
          height: 40,
          borderWidth: 1,
          borderColor: '#FFFFFF',
          alignSelf: 'center',
          borderRadius: 8,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (ImagePicked === false) {
            OpenGallery();
            setImagePicked(true);
          } else {
            UploadProfilePicture();
            setImagePicked(false);
          }
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18}}>
          {ImagePicked === true ? 'Save Picture' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 30,
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: sleectedTab == 0 ? '#0099ff' : '#000',
          }}
          onPress={() => {
            setsleectedTab(0);
          }}>
          <Text style={{fontSize: 18, color: '#FFFFFF'}}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: sleectedTab == 1 ? '#0099ff' : '#000',
          }}
          onPress={() => {
            setsleectedTab(1);
          }}>
          <Text style={{fontSize: 18, color: '#FFFFFF'}}>Following</Text>
        </TouchableOpacity>
      </View>
      {sleectedTab == 1 ? null : (
        <FlatList
          data={followers}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginTop: '1%',
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor:'red'
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={
                      item.profilepic == ''
                        ? require('../Assets/profile1.png')
                        : {uri: item.profilepic}
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: '10%',
                      marginRight: '5%',
                    }}
                  />
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
                    {item.firstname}
                  </Text>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      fontWeight: '600',
                      marginLeft: '2%',
                    }}>
                    {item.lastname}
                  </Text>
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('Chatt',{
                    data:item,
                    userid:userid,
                  });
                }}
                    style={{
                      width: '20%',
                      height: 40,
                      // backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft:'27%'
                    }}>
                    <Image
                      style={{width: '47%', height: '80%',}}
                      source={require('../Assets/chat1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
      {sleectedTab == 0 ? null : (
        <FlatList
          data={following}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginTop: '1%',
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor:'red'
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={
                      item.profilepic == ''
                        ? require('../Assets/profile1.png')
                        : {uri: item.profilepic}
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: '10%',
                      marginRight: '5%',
                    }}
                  />
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
                    {item.firstname}
                  </Text>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      fontWeight: '600',
                      marginLeft: '2%',
                    }}>
                    {item.lastname}
                  </Text>
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('Chatt',{
                    data:item,
                    userid:userid,
                  });
                }}
                    style={{
                      width: '20%',
                      height: 40,
                      // backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft:'27%'
                    }}>
                    <Image
                      style={{width: '47%', height: '80%',}}
                      source={require('../Assets/chat1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Profile;
