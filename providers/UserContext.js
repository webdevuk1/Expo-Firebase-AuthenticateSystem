import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import {
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithCredential,
} from "firebase/auth";
import firebase from "firebase/compat/app";

import { onAuthStateChanged, reload, getUser } from "../config/user";
import { auth } from "../config/firebase";

// trying this
import { useNavigation } from "@react-navigation/native";

const UserContext = createContext();

const config = {
  androidClientId: Constants.manifest.extra.androidClientId,
  iosClientId: Constants.manifest.extra.iosClientId,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email"],
};

export const UserContextProvider = ({ children }) => {
  // change state user on all pages
  const [user, setUser] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  // add splash screen on isLoading
  const [isLoading, setIsLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [useNav, setUseNav] = useState(false);
  const currentUser = firebase.auth().currentUser; // need to change setuser user to currentuser over the ap
  const navigation = useNavigation();

  // When uploading the project to the app store i will need to switch out the bundle id on firebase. currently using host.exp.exponent for development on expo.
  const signInWithGoogle = async () => {
    setGlobalLoading(true);

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

        return Promise.reject();
      });
    } catch (error) {
      setGlobalError(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  // reauthenticate With Google login
  // useEffect(() => {
  //   setUseNav(true);
  // }, [setToggleUseNav]);
  // const setToggleUseNav = () => {};
  const reauthenticateWithGoogle = async () => {
    setGlobalLoading(true);

    try {
      await Google.logInAsync(config).then(async (logInResult) => {
        const { idToken, accessToken, user } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        if (
          user.email === currentUser.email &&
          logInResult.type === "success"
        ) {
          // const currentUser = firebase.auth().currentUser;
          //  console.log(user.email);
          ////  console.log(currentUser.email);
          //  if (user.email === currentUser.email) {
          //  setUseNav(true);
          reauthenticateWithCredential(currentUser, credential).then(() => {
            navigation.navigate("UpdateEmailScreen");
            //     setToggleUseNav();
            //     //setUseNav(true);
            //     console.log(useNav);
          });
          //
          // console.log(user, "worked");
        }

        // return Promise.reject(); // find out what is means
      });
    } catch (error) {
      setGlobalError(error);
      //   setUseNav(false);
      //  console.log(useNav);
      console.log(error);
      //  console.log(globalError);
    } finally {
      setGlobalLoading(false);
    }
    return reauthenticateWithGoogle;
  };

  /*
    fix 
    The action 'POP_TO_TOP' was not handled by any navigator.
    Is there any screen to go back to?
  */
  // move all auth over to usercontext e.g signin with login and signout forgotpass and seterror to the pages

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        // add verify email link
        setUser(user);
        setGlobalError(null);
      } else {
        setUser(user);
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
      setUser(user);
      setGlobalError(null);
      setGlobalLoading(false);
    } catch (error) {
      setUser(null);
      setGlobalError(error);
      setGlobalLoading(false);
    }
  };

  const value = {
    user,
    globalError,
    globalLoading,
    useNav,
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
