import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { updatePassword } from "../../config/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Logo,
  Button,
  FormErrorMessage,
} from "../../components";
import { Images, Colors } from "../../config";
import { useTogglePasswordVisibility } from "../../hooks";
import { signupValidationSchema } from "../../utils";

export const UpdatePasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const [successState, setSuccessState] = useState("");

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleUpdatePassword = async (values) => {
    const { password } = values;
    try {
      await updatePassword(values);
      setSuccessState("Congratulations your password has been updated.");
    } catch (error) {
      setErrorState(error.message);
    }
    return handleUpdatePassword;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("ProfileScreen");
    }, 170000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consits app logo and screen title */}
        <View style={styles.center}>
          <View style={styles.logo}>
            <Logo uri={Images.logo} />
          </View>
          {successState ? (
            <Text style={styles.screenText}>{successState}</Text>
          ) : null}
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values) => handleUpdatePassword(values)}
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
              <TextInput
                name="password"
                leftIconName="key-variant"
                placeholder="Enter New Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="newPassword"
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
              <TextInput
                name="confirmPassword"
                leftIconName="key-variant"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType="password"
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              {/* Display Screen Error Mesages */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Signup button */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update</Text>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
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
  logo: {
    paddingTop: 10,
  },
  screenText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 10,
    paddingBottom: 10,
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
});
