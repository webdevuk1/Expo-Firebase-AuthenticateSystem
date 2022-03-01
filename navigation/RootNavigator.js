import React from "react";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { UnverifiedStack } from "./UnverifiedStack";
import { useUserContext } from "../providers/UserContext";

export const RootNavigator = () => {
  const { currentUser } = useUserContext();

  // User is authenticated and verified
  if (currentUser && currentUser.emailVerified) return <AppStack />;

  // User is authenticated, but their email hasn't been verified
  if (currentUser) return <UnverifiedStack />;

  return <AuthStack />;
};
