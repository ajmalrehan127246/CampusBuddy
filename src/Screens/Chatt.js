import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

let userid = '';
const Chatt = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log(route.params.data.userid);

  useEffect(() => {
    const querySnapShot=firestore()
    .collection('chats')
    .doc('123456789')
    .collection('messages')
    .orderBy('createdAt','desc');
    querySnapShot.onSnapshot(snapShot => {
      const allMessages=snapShot.docs.map(snap =>{
        return {...snap.data(), createdAt:new Date()};
      });
setMessages(allMessages);
    });
    
  }, []);

  const onSend = async (messageArray) => {
    try {
      const userid = await AsyncStorage.getItem('UserID');
      
      // Replace 'route' with your actual route object
      const receiverId = '123456789'; // Replace with the correct receiverId
      
      console.log(messageArray);
      const msg = messageArray[0];
      const myMsg = { 
        ...msg,
        senderId: userid,
        receiverId: route.params.data.userid,
      };
  
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, myMsg)
      );
  
      await firestore()
        .collection("chats")
        .doc('123456789')
        .collection("messages")
        .add({
          ...myMsg,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error("Error in onSend:", error);
      // Handle the error as needed
    }
  };
  
  
  // const onSend = async () messageArray => {
  //   const userid = await AsyncStorage.getItem('UserID');
  //   // let  messageArray= '';
  //   console.log(messageArray);
  //   const msg = messageArray[0];
  //   const myMsg = {
  //     ...msg,
  //     senderId: userid,
  //     receiverId: route.params.data.userid,
  //   };

  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, myMsg));
  //     firestore()
  //     .collection("chats")
  //     .doc('123456789')
  //     .collection("messages")
  //     .add({
  //       ...myMsg,
  //       createdAt: new Date(),
  //     })
  // };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          
          _id: userid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#1eaf60',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Chatt;
