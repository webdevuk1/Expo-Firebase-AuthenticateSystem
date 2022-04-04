import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Google from "expo-google-app-auth";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import {
  View,
  TextInput,
  Logo,
  Button,
  FormErrorMessage,
} from "../../components";
import { Images, Colors, auth } from "../../config";
import { useTogglePasswordVisibility } from "../../hooks";
import { loginValidationSchema } from "../../utils";
import { useUserContext } from "../../providers/UserContext";

export const LoginScreen = ({ navigation }) => {
  const { config, setIsLoading } = useUserContext();
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await Google.logInAsync(config).then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
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
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View isSafe style={styles.container}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.center}>
            <Text style={styles.screenTitle}>FitAddicted</Text>
            <Logo uri={Images.logo} />
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
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
                  vralue={values.password}
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
              </>
            )}
          </Formik>
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"Forgot Password?"}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
          <View style={styles.center}>
            <Text style={styles.text}>OR</Text>
          </View>
          <Button
            style={styles.button}
            onPress={() => handleSignInWithGoogle()}
          >
            <Text style={styles.buttonText}>Sign In With Google</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
      {/* App info footer */}
      <Button
        style={styles.footer}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.footerText}>Create a new account?</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  center: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 35,
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
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
  footer: {
    position: "relative",
    bottom: 0,
    backgroundColor: Colors.black,
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
  },
});
