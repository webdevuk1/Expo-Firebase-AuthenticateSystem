import React from "react";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { UnverifiedStack } from "./UnverifiedStack";
import { useUserContext } from "../providers/UserContext";
import { LoadingIndicator } from "../components";

export const RootNavigator = () => {
  const { currentUser, isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // User is authenticated and verified
  if (currentUser && currentUser.emailVerified)
    return (
      // <NavigationContainer>
      <AppStack />
      //  </NavigationContainer>
    );

  // User is authenticated, but their email hasn't been verified
  if (currentUser)
    return (
      //   <NavigationContainer>
      <UnverifiedStack />
      //  </NavigationContainer>
    );

  return (
    //   <NavigationContainer>
    <AuthStack />
    //  </NavigationContainer>
  );
};
