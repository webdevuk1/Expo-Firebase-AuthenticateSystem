import React from "react";
import { StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

import { signOut } from "firebase/auth";
import { useUserContext } from "../providers/UserContext";
import { Colors, auth } from "../config";
import { View, Button } from "../components";

export const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useUserContext();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>

        <Text style={styles.title}>Account:</Text>

        <Button
          style={styles.settings}
          onPress={() => navigation.navigate("ReauthenticateEmailScreen")}
        >
          <Text style={styles.text}>Change Email Address</Text>
          <Icon
            type="ionicon"
            name={
              Platform.OS === "ios"
                ? "ios-chevron-forward-outline"
                : "chevron-forward-outline"
            }
          />
        </Button>

        <Button
          style={styles.settings}
          onPress={() => navigation.navigate("ReauthenticatePasswordScreen")}
        >
          <Text style={styles.text}>Change Password</Text>
          <Icon
            type="ionicon"
            name={
              Platform.OS === "ios"
                ? "ios-chevron-forward-outline"
                : "chevron-forward-outline"
            }
          />
        </Button>

        <Button style={styles.settings}>
          <Text style={styles.text}>Remove Ads</Text>
          <Icon
            type="ionicon"
            name={
              Platform.OS === "ios"
                ? "ios-chevron-forward-outline"
                : "chevron-forward-outline"
            }
          />
        </Button>

        <Button style={styles.settings}>
          <Text style={styles.text}>Change Your FitAddicted Theme</Text>
          <Icon
            type="ionicon"
            name={
              Platform.OS === "ios"
                ? "ios-chevron-forward-outline"
                : "chevron-forward-outline"
            }
          />
        </Button>

        <Button style={styles.settings}>
          <Text style={styles.text}>Donate To FitAddicted</Text>
          <Icon
            type="ionicon"
            name={
              Platform.OS === "ios"
                ? "ios-chevron-forward-outline"
                : "chevron-forward-outline"
            }
          />
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  settings: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
  },
  email: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    color: Colors.black,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    flex: 1,
    color: Colors.black,
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: "700",
    fontSize: 16,
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
  footer: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});
