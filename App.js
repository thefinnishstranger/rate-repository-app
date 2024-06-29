import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <>
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <Main />
        </View>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  )
}

export default App
