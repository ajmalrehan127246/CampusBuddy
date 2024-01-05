import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

let userId = '';
const Home = ({navigation}) => { 
  const [postData, setpostData] = useState([]);
  const [OnLikeClick, setOnLikeClick] = useState(false)
  useEffect(() => {
    getData();
    getUserId();
  });

 

  const getUserId = async () => {
    userId = await AsyncStorage.getItem('UserID');
  };

  const getData = () => {
    let tempData = [];
    firestore()
      .collection('Post')
      .get()
      .then(querySnapshot => {
        // console.log('Total Post: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
        setpostData(tempData);
      });
  };

  const getLikesStatus = Likes => {
    let Status = false;
    Likes.map(item => {
      if (item === userId) {
        Status = true;
      } else {
        Status = false;
      }
    });
    return Status;
  };

  const OnLike=item=>{
    let tempLikes=item.Likes;
    if(tempLikes.length > 0){
      tempLikes.map(item1=>{
        if(item1 == userId){
          const index=tempLikes.indexOf(item1);
          if(index > -1){
            tempLikes.splice(index,1);
          }
        }
        else{
          tempLikes.push(userId);
        }
      });
    }
   else{
    tempLikes.push(userId);
   }
    firestore()
    .collection('Post')
    .doc(item.postId)
    .update({
      
      Likes: tempLikes,
     
    })
    .then(() => {
      console.log('Post updated');
    })
    .catch(error=>{});
    setOnLikeClick(!OnLikeClick)

  };

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <View
        style={{
          marginTop: '6%',
          marginLeft: '5%',
          // backgroundColor: 'red',
          width: '100%',
          height: h('5%'),
          borderBottomColor: '#FFFFFF',
          borderWidth: 1.5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: '23%',
          }}>
          Campus Buddy
        </Text>
      </View>
      {postData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  // marginTop: '7%',
                  width: '90%',
                  // height: h('40%'),
                  alignSelf: 'center',
                  backgroundColor: '#000000',
                  borderRadius: 20,
                  borderColor: 'grey',
                  borderWidth: 1.5,
                  marginTop: '6%',
                  marginBottom: postData.length - 1 == index ? '5%' : 0,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    marginTop: '3%',
                  }}>
                    {item.profilepic == '' || item.profilepic == null  ?  (
                 <Image
                 source={require('../Assets/profile1.png')}
                 style={{
                   width: 50,
                   height: 50,
                   marginLeft: 10,
                   marginRight: 15,
                   borderRadius: 25,
                 }}
               />
                
              ) : (
                <Image
                source={{uri: item.profilepic}}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  marginRight: 15,
                  borderRadius: 25,
                }}
                  />
               
              )}
                  {/* <Image
                    source={require('../Assets/Ajmal1.png')}
                    style={{
                      width: '18.5%',
                      height: h('9.7%'),
                      borderRadius: 100,
                      marginLeft: '3%',
                    }}
                  /> */}
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#FFFFFF',
                      marginLeft: '1%',
                      marginTop: '3%',
                    }}>
                    {item.fname}
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{fontSize: 20, color: '#FFFFFF', marginTop: '3%'}}>
                    {item.lname}
                  </Text>
                </View>
                <Text style={{margin: '4%', fontSize: 17, color: '#FFFFFF'}}>
                  {item.caption}
                </Text>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '90%',
                    height: h('25%'),
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginBottom: '3%',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: h('8%'),
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                    OnLike(item);
                  }}>
                    <Text style={{color: 'white', marginRight: '10%'}}>
                      {item.Likes.length}
                    </Text>
                    {getLikesStatus(item.Likes) ? (
                      <Icon name={'heart'} size={25} color={'red'}  />
                    ) : (
                      <Icon name={'heart'} size={25} color={'white'} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row'}}
                  onPress={()=>{
                    navigation.navigate('Comments',{
                      postId:item.postId,
                      Comments:item.Comments,
                    });

                  }}
                  >
                    <Text style={{marginRight: '12%', color: 'white'}}>
                      {item.Comments.length}
                    </Text>
                    <Icon1 name={'comment-alt'} size={25} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#ffffff', fontSize: 23, letterSpacing: 1}}>
            No Post Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
