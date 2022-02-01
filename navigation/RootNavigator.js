import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { UnverifiedStack } from './UnverifiedStack';
import { useUserContext } from '../providers/UserContext';
import { LoadingIndicator } from '../components';

export const RootNavigator = () => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // User is authenticated and verified
  if (user && user.emailVerified)
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );

  // User is authenticated, but their email hasn't been verified
  if (user)
    return (
      <NavigationContainer>
        <UnverifiedStack />
      </NavigationContainer>
    );

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
