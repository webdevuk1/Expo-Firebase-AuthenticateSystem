import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigation/RootNavigator";
import { UserContextProvider } from "./providers/UserContext";

// Check this in the future logBox.
import { LogBox } from "react-native";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </UserContextProvider>
    </NavigationContainer>
  );
};

export default App;
