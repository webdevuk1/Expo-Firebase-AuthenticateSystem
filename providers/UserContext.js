import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { onAuthStateChanged, reload, getUser } from "../config/user";
import { auth } from "../config/firebase";

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

  // When uploading the project to the app store i will need to switch out the bundle id on firebase. currently using host.exp.exponent for development on expo.
  const signInWithGoogle = async () => {
    setGlobalLoading(true);

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          if (user === "" || user === user) {
            const { idToken, accessToken } = logInResult;
            const credential = GoogleAuthProvider.credential(
              idToken,
              accessToken
            );

            await signInWithCredential(auth, credential);
          }
        }

        return Promise.reject();
      })
      .catch((error) => setGlobalError(error))
      .finally(() => setGlobalLoading(false));
  };

  //Add prettier
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
    reload: handleReload,
    signInWithGoogle,
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
