import { View, Text,Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Post from '../Screens/Post';
import Chatt from '../Screens/Chatt';
import Profile from '../Screens/Profile';

const Tab=createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <View style={{flex:1,backgroundColor:'fffff'}}>
     <Tab.Navigator
     initialRouteName="Home"
     screenOptions={{
       // headerShown: false,
       tabBarStyle: {
         backgroundColor: '#000000',
         height: 55,
         paddingBottom: 8,
         borderTopWidth:0,
        //  borderRadius:10,
        
         borderTopColor: 'cyan',
         elevation: 0,
         shadowColor: '#000000',
         shadowOpacity: 0,
         shadowOffset: {
           height: 0,
         },
         shadowRadius: 0,
        
         // paddingVertical:10
       },
     }}>
          <Tab.Screen
           name='Home'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarActiveTintColor: '#1eaf60',
            
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 0 : 0,
                  borderColor: focused ? 'red' : 'pink',
                  // width: '10%',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                
                }}>
                <Image
                  source={require('../Assets/home.png')}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1eaf60' : '#FFFFFF',
                  }}
                />
                  {/* <Icon name={'home'} size={20} color={color} /> */}
              </View>
                
            ),}}/>

          <Tab.Screen
           name='Search'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          component={Search}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarInactiveTintColor: '#808080',
            tabBarActiveTintColor: 'red',
            
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 0 : 0,
                  borderColor: focused ? 'red' : 'pink',
                  // width: '10%',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                
                }}>
                <Image
                  source={require('../Assets/search.png')}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1eaf60' : '#FFFFFF',
                  }}
                />
                  {/* <Icon name={'home'} size={20} color={color} /> */}
              </View>
                
            ),}}/>

          <Tab.Screen
           name='Post'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          component={Post}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarInactiveTintColor: '#808080',
            tabBarActiveTintColor: 'red',
            
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 0 : 0,
                  borderColor: focused ? 'red' : 'pink',
                  // width: '10%',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                
                }}>
                <Image
                  source={require('../Assets/post.png')}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1eaf60' : '#FFFFFF',
                  }}
                />
                  {/* <Icon name={'home'} size={20} color={color} /> */}
              </View>
                
            ),}}/>

          <Tab.Screen
           name='Chatt'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          component={Chatt}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarInactiveTintColor: '#808080',
            tabBarActiveTintColor: 'red',
            
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 0 : 0,
                  borderColor: focused ? 'red' : 'pink',
                  // width: '10%',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                
                }}>
                <Image
                  source={require('../Assets/chat.png')}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ?  '#1eaf60' : '#FFFFFF',
                  }}
                />
                  {/* <Icon name={'home'} size={20} color={color} /> */}
              </View>
                
            ),}}/>
          <Tab.Screen
           name='Profile'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          component={Profile}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarActiveTintColor: '#1eaf60',
            
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 0 : 0,
                  borderColor: focused ? 'red' : 'pink',
                  // width: '10%',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                
                }}>
                <Image
                  source={require('../Assets/profile.png')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1eaf60' : '#FFFFFF',
                  }}
                />
                  {/* <Icon name={'home'} size={20} color={color} /> */}
              </View>
                
            ),}}/>

     </Tab.Navigator>
    </View>
  )
}

export default BottomNavigation;