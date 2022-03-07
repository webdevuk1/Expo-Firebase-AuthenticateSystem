import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getUser } from "../../config/user";

import { View, TextInput, Button, FormErrorMessage } from "../../components";
import { Colors } from "../../config";
import { updateEmailValidationSchema } from "../../utils";

export const UpdateEmailScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const [successState, setSuccessState] = useState("");

  const handleUpdateEmail = async (values) => {
    const { email } = values;

    try {
      await getUser()
        .verifyBeforeUpdateEmail(email)
        .then(() => {
          setSuccessState(
            "An verification email has be sent to your new email address please confirm to update your email address."
          );
          setErrorState("");
        });
    } catch (error) {
      setSuccessState("");
      setErrorState(error.message);
    }
  };

  // need put reloadUser() when going to setting page.

  //need to change seconds on a module
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("ProfileScreen");
    }, 170000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consits app logo and screen title */}
        <View style={styles.center}>
          {/* <Text style={styles.screenTitle}></Text>nothing in this text*/}
          {successState ? (
            <Text style={styles.screenText}>{successState}</Text>
          ) : null}
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={updateEmailValidationSchema}
          onSubmit={(values) => handleUpdateEmail(values)}
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
                placeholder="Enter New Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onChange={(event) => setErrorState("")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              {/* Display Screen Error Mesages */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Login button */}
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
  email: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
    paddingBottom: 10,
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
