import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

let userid = '';


const Search = () => {
  const [userList, setuserList] = useState([]);
  const [onFollowClick, setonFollowClick] = useState(false);

  useEffect(() => {
    getUser();
  }, [onFollowClick]);

  const getUser = async () => {
    let tempUsers = [];
    userid = await AsyncStorage.getItem('UserID');
   
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot._docs)
        querySnapshot._docs.map(item => {
          if (item._data.userid !== userid) {
            tempUsers.push(item);
          }
        });
        setuserList(tempUsers);
      });
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

  const followUser =  item => {
    let tempFollowers = item._data.followers;
    
    let following = [];
    let firstname = '';
    let lastname = '';
    let profilepic = '';

    firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then(snapshot => {
        following = snapshot.data().following;
        firstname = snapshot.data().firstname;
        lastname = snapshot.data().lastname;
        profilepic = snapshot.data().profilepic;
      });

        if(following.length > 0){
          following.map(item2 => {
            if(item2.userid == item._data.userid) {
              let index2= -1;
              following.map((x, i) => {
                if(x.userid == item._data.userid) {
                  index2 = i;
                }
              });
              if (index2 > -1) {
                following.splice(index2, 1);
              } else {
                following.push({
                firstname: item._data.firstname,
                lastname: item._data.lastname,
                userid: item._data.userid,
                profilepic: item._data.profilepic,
                });
              }
            } else {
              following.push({
                firstname: item._data.firstname,
                lastname: item._data.lastname,
                userid: item._data.userid,
                profilepic: item._data.profilepic,
                });
            }
          });
        } else {
          following.push({
            firstname: item._data.firstname,
            lastname: item._data.lastname,
            userid: item._data.userid,
            profilepic: item._data.profilepic,
            });
        }
   
      
      


    // if (following.length > 0) {
    //   following.map(item2 => {
    //     if (item2 == item._data.userid) {
    //       let index2 = following.indexOf(item._data.userid);
    //       if (index2 > -1) {
    //         following.splice(index2, 1);
    //       } else {
    //         // following.push(item._data.userid);
    //         following.push({
    //           firstname: item._data.firstname,
    //           lastname: item._data.lastname,
    //           userid: item._data.userid,
    //           profilepic: item._data.profilepic,
    //           });
    //       }
    //     } else{
    //       // following.push(item._data.userid); 
    //       following.push({
    //         firstname: item._data.firstname,
    //         lastname: item._data.lastname,
    //         userid: item._data.userid,
    //         profilepic: item._data.profilepic,
    //         });
    //   }
     
    //   });
    // } 
    // else {
    //   // following.push(item._data.userid);
    //   following.push({
    //     firstname: item._data.firstname,
    //     lastname: item._data.lastname,
    //     userid: item._data.userid,
    //     profilepic: item._data.profilepic,
    //     });
    // }

    firestore()
    .collection('Users')
    .doc(userid)
    .update({
      following: following,
    })
    .then(res => {})
    .catch(error => {
      console.log(error);
    });

    if (tempFollowers.length > 0){
      tempFollowers.map(item1 => {
        if(item1.userid == userid){
          let index = -1;
          tempFollowers.map((x,i) => {
            if(x.userid == userid) {
              index = i;
            }
          });

          if(index > -1) {
            tempFollowers.splice(index, 1);
          }
        } else{
          tempFollowers.push({
            firstname : firstname,
            lastname : lastname,
            userid : userid,
            profilepic : profilepic,
          });
          
        }
      });
    } else {
      tempFollowers.push({
        firstname : firstname,
        lastname : lastname,
        userid : userid,
        profilepic : profilepic,
      });

    }
     
          
    


    // if (tempFollowers.length > 0) {
    //   tempFollowers.map(item1 => {
    //     if (item1 == userid) {
    //       let index = tempFollowers.indexOf(userid);
    //       if (index > -1) {
    //         tempFollowers.splice(index, 1);
    //       }
    //     } else {
    //       tempFollowers.push(userid);
    //     }
    //   });
    // } else {
    //   tempFollowers.push(userid);
    // }

    firestore()
      .collection('Users')
      .doc(item._data.userid)

      .update({
        followers: tempFollowers,
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });

    setonFollowClick(!onFollowClick);
    getUser();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                marginTop: '2%',
                width: '100%',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={
                    item._data.profilepic == ''
                      ? require('../Assets/profile1.png')
                      : {uri: item._data.profilepic}
                  }
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginLeft: '10%',
                    marginRight: '5%',
                  }}
                />
                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
                  {item._data.firstname}
                </Text>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: '2%',
                  }}>
                  {item._data.lastname}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  backgroundColor: '#0099ff',
                  height: 40,
                  width: 80,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  followUser(item);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 15,
                  }}>
                  {getFollowStatus(item._data.followers)
                    ? 'Unfollow'
                    : 'Follow '}
                  {/* {'Follow'} */}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Search;
