import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { View, Button } from '../components';

export const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}></View>
      {/*Footer*/}
      <Button style={styles.footer}>
        <Text style={styles.footerText}>+</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  center: {
    alignItems: 'center',
  },
  footer: {
    position: 'relative',
    bottom: 0,
    backgroundColor: Colors.black,
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
});
