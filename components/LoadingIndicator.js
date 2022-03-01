import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import { Colors } from "../config";
import { View } from "./View";
import { useUserContext } from "../providers/UserContext";

export const LoadingIndicator = () => {
  // Using isLoading to toggle the overlay
  const { isLoading } = useUserContext();

  return (
    <View>
      <Overlay fullScreen={true} isVisible={isLoading}>
        <ActivityIndicator
          style={styles.center}
          size="large"
          color={Colors.orange}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
