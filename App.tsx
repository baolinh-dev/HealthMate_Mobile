import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { OPENSANS_REGULAR } from './utils/const';
import About from './screens/about';
import Detail from './screens/detail';
import Home from './screens/home';

SplashScreen.preventAutoHideAsync(); // Giữ splash screen cho đến khi font được tải xong

export default function App() {
  const [fontsLoaded] = useFonts({
    [OPENSANS_REGULAR]: require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Hiển thị màn hình splash cho đến khi font được tải
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.text}>Hello, this is OpenSans!</Text> 
      <About />
      <Detail />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: OPENSANS_REGULAR,
    fontSize: 24,
  },
});
