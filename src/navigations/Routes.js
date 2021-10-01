import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Explore, Home, Profile } from '../screens';
import navigationStrings from '../constants/navigationStrings';
const Stack = createNativeStackNavigator();

function Routes() { 
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown:false}}>
        <Stack.Screen name={navigationStrings.HOME} component={Home} />
        <Stack.Screen name={navigationStrings.PROFILE} component={Profile} />
        <Stack.Screen name={navigationStrings.EXPLORE} component={Explore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;