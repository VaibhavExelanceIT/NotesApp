import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CreatePost,
  EditScreen,
  HomeScreen,
  InstaHome,
  LoginScreen,
  RegistrationScreen,
} from '../helper/screens';

const Stack = createNativeStackNavigator();
const RootStak = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="RegisterScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: true, headerBackVisible: false}}
      />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="InstaHome" component={InstaHome} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="RegisterScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default RootStak;
