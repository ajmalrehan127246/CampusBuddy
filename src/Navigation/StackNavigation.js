import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Signup from '../Screens/Signup';
import Logins from '../Screens/Login';
import BottomNavigation from './BottomNavigation';
import Commentss from '../Screens/Comments';


const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <View style={{flex: 1,}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Logins}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Comments"
            component={Commentss}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default StackNavigation;
