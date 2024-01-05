import {View, Text, TextInput, FlatList, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

let userId = '';
let Comments = [];
let postId = '';
let firstname = '';
let lastname = '';
let profilepic = '';
const Commentss = () => {
  const [Comment, setComment] = useState('');
  const ClearTextInput = useRef();
  const [ShowCommentList, setShowCommentList] = useState([]);
  const route = useRoute();
  console.log(route.params.postId);

  useEffect(() => {
    getUserId();
    Comments = route.params.Comments;
    console.log(Comments);
    setShowCommentList(Comments);
    postId = route.params.postId;
  }, []);

  const getUserId = async () => {
    userId = await AsyncStorage.getItem('UserID');
    firstname = await AsyncStorage.getItem('FirstName');
    lastname = await AsyncStorage.getItem('LastName');
    profilepic = await AsyncStorage.getItem('Profile_Pic');
  };
  const PostComments = () => {
    let tempComments = Comments;
    tempComments.push({
      userId: userId,
      Comments: Comment,
      postId: postId,
      firstname: firstname,
      lastname: lastname,
      profilepic: profilepic,
    });
    firestore()
      .collection('Post')
      .doc(postId)
      .update({
        Comments: tempComments,
      })
      .then(() => {
        console.log('Post updated');
        GetNewComments();
      })
      .catch(error => {});
    ClearTextInput.current.clear();
  };

  const GetNewComments=() => {
    firestore()
      .collection('Post')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        setShowCommentList(documentSnapshot.data().Comments);
      });

  }

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
          Comments
        </Text>
      </View>
      <FlatList
        data={ShowCommentList}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 70,
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              {item.profilepic == '' || item.profilepic === null  ?  (
                 <Image
                 source={require('../Assets/profile1.png')}
                 style={{
                   width: 40,
                   height: 40,
                   marginLeft: 10,
                   marginRight: 15,
                   borderRadius: 20,
                 }}
               />
                
              ) : (
                <Image
                source={{uri: item.profilepic}}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 10,
                  marginRight: 15,
                  borderRadius: 20,
                }}
                  />
               
              )}
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: '#FFFFFF'}}>
                    {item.firstname}
                  </Text>
                  <Text>{'  '}</Text>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: '#FFFFFF'}}>
                    {item.lastname}
                  </Text>
                </View>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF',marginTop:'4%'}}>
                  {item.Comments}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          width: '100%',
          height: '8%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          ref={ClearTextInput}
          value={Comment}
          onChangeText={txt => {
            setComment(txt);
          }}
          placeholder="type Comment here..."
          style={{width: '80%', marginLeft: 20}}
        />
        <Text
          style={{marginRight: '3%', fontSize: 20, fontWeight: '600'}}
          onPress={() => {
            PostComments();
          }}>
          Send
        </Text>
      </View>
    </View>
  );
};

export default Commentss;
