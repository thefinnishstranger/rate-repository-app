import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants'
import AuthStorage from './src/utils/AuthStorage';
import AuthStorageContext from './src/components/contexts/AuthStorageContext';

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <View style={{ flex: 1 }}>
              <Main />
            </View>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  )
}

export default App
