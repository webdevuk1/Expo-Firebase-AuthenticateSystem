import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { reauthenticate } from "../../config/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { View, TextInput, Button, FormErrorMessage } from "../../components";
import { Colors } from "../../config";
import { useTogglePasswordVisibility } from "../../hooks";
import { loginValidationSchema } from "../../utils";
import { useUserContext } from "../../providers/UserContext";

export const ReauthenticatePasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { currentUser, config, setIsLoading } = useUserContext();
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleReauthenticate = async (values) => {
    const { email, password } = values;
    try {
      await reauthenticate(values);
      navigation.navigate("UpdatePasswordScreen");
    } catch (error) {
      setErrorState(error.message);
    }
  };

  const handleReauthenticateWithGoogle = async () => {
    setIsLoading(true);

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
              navigation.navigate("UpdatePasswordScreen");
            }
          );
        } else {
          setErrorState(
            "Cant sign in to your Google account, Please make sure you selected the correct Google account."
          );
        }
      });
    } catch (error) {
      setErrorState(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.center}>
            <Text style={styles.screenTitle}>Sign In To Update Password</Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleReauthenticate(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
                <View style={styles.center}>
                  <Text style={styles.text}>OR</Text>
                </View>
                <Button
                  style={styles.button}
                  onPress={() => handleReauthenticateWithGoogle()}
                >
                  <Text style={styles.buttonText}>Sign In With Google</Text>
                </Button>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  center: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
    paddingBottom: 20,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
