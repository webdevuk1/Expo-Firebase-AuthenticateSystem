import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import { VerifyEmailScreen } from '../screens';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

const Stack = createStackNavigator();

export const UnverifiedStack = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='VerifyEmail'
        component={VerifyEmailScreen}
        options={{
          title: 'Verify Email',
          headerLeft: props => (
            <HeaderBackButton {...props} onPress={handleLogout} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
