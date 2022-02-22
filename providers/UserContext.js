import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import {
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithCredential,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { onAuthStateChanged, reload } from "../config/user";
import { auth } from "../config/firebase";
// pop to to was not handled by an navigator s there any seen to go back to ?
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  // splash screen on isLoading need to fix
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const config = {
    androidClientId: Constants.manifest.extra.androidClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email"],
  };

  // When uploading the project to the app store i will need to switch out the bundle id on firebase. currently using host.exp.exponent for development on expo.
  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await Google.logInAsync(config).then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken, user } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
          console.log(user);
        }
      });
    } catch (error) {
      setGlobalError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Find out a better way to do this navigat.nav so its on the reauth screen so i dont have render a global error to the page.
  const reauthenticateWithGoogle = async () => {
    //setIsLoading(true);

    try {
      await Google.logInAsync(config).then(async (logInResult) => {
        const { idToken, accessToken, user } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        if (
          user.email === currentUser.email &&
          logInResult.type === "success"
        ) {
          await reauthenticateWithCredential(currentUser, credential).then(
            () => {
              navigation.navigate("UpdateEmailScreen");
            }
          );
        }
      });
    } catch (error) {
      setGlobalError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  /*
    fix 
    The action 'POP_TO_TOP' was not handled by any navigator.
    Is there any screen to go back to?
  */

  // add logout withexpo google
  // move all auth over to usercontext e.g signin with login and signout forgotpass and seterror to the pages

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // add verify email link
        setCurrentUser(currentUser);
        setGlobalError(null);
      } else {
        setCurrentUser(null);
        setGlobalError(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleReload = async () => {
    try {
      await reload();
      const user = getUser();
      setCurrentUser(user);
      setGlobalError(null);
    } catch (error) {
      setCurrentUser(null);
      setGlobalError(error);
    }
  };

  const value = {
    currentUser,
    globalError,
    config,
    reload: handleReload,
    signInWithGoogle,
    reauthenticateWithGoogle,
  };

  return (
    <UserContext.Provider value={value}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  return userContext;
};
