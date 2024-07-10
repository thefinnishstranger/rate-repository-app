import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import useSignOut from '../utils/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  tab: {
    marginRight: 0,
  },
  tabText: {
    color: '#fff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginRight: 20
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable style={styles.tab}>
      <Text style={styles.tabText}>{title}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { signOut, data } = useSignOut()
  console.log('data', data);

  return (
    <View style={styles.container}>
      <AppBarTab />
      <ScrollView horizontal>
      <View>
        <Link to='/repositories'>
            <Text style={styles.tabText}>Repositories</Text>
        </Link>
      </View>
      <View>
        <Link to='/signin'>
            <Text style={styles.tabText}>Sign In</Text>
        </Link>
      </View>
      <View>
        <Link to='/signup'>
            <Text style={styles.tabText}>Sign Up</Text>
        </Link>
      </View>
      <View>
        <Link to='/create-review'>
            <Text style={styles.tabText}>Create Review</Text>
        </Link>
      </View>
      {data && data.me ? (
        <View>
        <Link to='/'>
            <Text style={styles.tabText} onPress={signOut}>Sign Out</Text>
        </Link>
      </View>
      ) : (
        <></>
      )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
