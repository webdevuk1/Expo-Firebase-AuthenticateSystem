import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";

import { onAuthStateChanged, reload } from "../config/user";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // When uploading the project to the app store i will need to switch out the bundle id on firebase.
  // currently using host.exp.exponent for development on expo.
  // config is linked to expo google auth.
  const config = {
    androidClientId: Constants.manifest.extra.androidClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email"],
  };

  /*
    fix 
    The action 'POP_TO_TOP' was not handled by any navigator.
    Is there any screen to go back to?

    if(navigation.canGoBack()) {
  navigation.dispatch(StackActions.pop(1));

  Why does Reload() log m e out of my account attemt add !currentuser on 
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
 }
  */

  // add logout with expo google check out sonny sang vid
  // move all auth over to usercontext e.g signin with login and signout forgotpass and seterror to the pages

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const handleReload = async () => {
    try {
      await reload().then(() => {
        const user = getUser();
        setCurrentUser(user);
      });
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    config,
    isLoading,
    setIsLoading,
    reload: handleReload,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
