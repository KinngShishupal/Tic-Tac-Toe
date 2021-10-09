import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Explore, Home, Profile } from '../screens';
import navigationStrings from '../constants/navigationStrings';
import {Button} from 'react-native';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Lobby from '../components/Lobby';
const Stack = createNativeStackNavigator();

function Routes() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>      
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
       <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp}  />
        <Stack.Screen name={navigationStrings.HOME} component={Home} />
        <Stack.Screen name={navigationStrings.PROFILE} component={Profile} />
        <Stack.Screen name={navigationStrings.EXPLORE} component={Explore} />
        <Stack.Screen name={navigationStrings.LOBBY} component={Lobby} 
          options={{
            headerRight: () => (
              <Button title='logout' color='#cc1f00'/>
    ),
  
  }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;