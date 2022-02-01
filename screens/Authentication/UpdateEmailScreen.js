import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateEmail } from "../../config/user";

import { View, TextInput, Button, FormErrorMessage } from "../../components";
import { Images, Colors } from "../../config";
import { updateEmailValidationSchema } from "../../utils";
import { useUserContext } from "../../providers/UserContext";

export const UpdateEmailScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const [successState, setSuccessState] = useState("");
  const { user, reload: reloadUser } = useUserContext();

  const handleUpdateEmail = async (values) => {
    const { email } = values;

    try {
      if (values !== user.email) {
        await updateEmail(values).then(() => {
          setSuccessState(
            "Congratulations your email address has been updated. An email will be sent to the original email address so if you have made any mistakes you can change it back to the original address."
          );
          setErrorState("");
        });
      }
    } catch (error) {
      setErrorState(error.message);
    }
    // pressing update email without any letters in the text box is showing succesState... need fix
    // need put reloadUser() onto the back button
    // condiction render the email not to show once its been updated.
    // need put reloadUser() onto the back button
    reloadUser();

    return handleUpdateEmail;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("ProfileScreen");
    }, 200000);

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
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              {/* Display Screen Error Mesages */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Login button */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update Email Address</Text>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.center}>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
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