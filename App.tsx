// App.tsx
import React from 'react';
import { View } from 'react-native';
import About from './screens/about';
import Detail from './screens/detail';
import Home from './screens/home';

const App = () => (
  <View>
    <About />
    <Detail />
    <Home />
  </View>
);

export default App;
