import * as React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { StackActions } from "@react-navigation/native";

import {
  HomeScreen,
  ProfileScreen,
  CalandarScreen,
  UpdatePasswordScreen,
  ReauthenticatePasswordScreen,
  ReauthenticateEmailScreen,
  UpdateEmailScreen,
} from "../screens";
import { View, Button } from "../components";

const Stack = createStackNavigator();

export const AppStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          // title: 'FitAddicted',
          headerRight: (props) => (
            <View style={styles.container}>
              <Button style={{ marginRight: 13 }}>
                <Icon
                  type="ionicon"
                  name={
                    Platform.OS === "ios"
                      ? "ios-calendar-sharp"
                      : "calendar-sharp"
                  }
                  size={33}
                  onPress={() => navigation.navigate("CalandarScreen")}
                />
              </Button>
              <Button>
                <Icon
                  type="ionicon"
                  name={
                    Platform.OS === "ios" ? "ios-person-sharp" : "person-sharp"
                  }
                  size={33}
                  onPress={() => navigation.navigate("ProfileScreen")}
                />
              </Button>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="CalandarScreen"
        component={CalandarScreen}
        options={{
          title: "Calandar",
        }}
      />
      <Stack.Screen
        name="UpdateEmailScreen"
        component={UpdateEmailScreen}
        options={{
          title: "Update Email Address",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.dispatch(StackActions.popToTop());
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
        options={{
          title: "Update Password",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.dispatch(StackActions.popToTop());
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ReauthenticatePasswordScreen"
        component={ReauthenticatePasswordScreen}
        options={{
          title: "Reauthenticate Account",
        }}
      />
      <Stack.Screen
        name="ReauthenticateEmailScreen"
        component={ReauthenticateEmailScreen}
        options={{
          title: "Reauthenticate Account",
        }}
      />
    </Stack.Navigator>
  );
};
/*onPress={() => goBack('screen-123')} */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
});
