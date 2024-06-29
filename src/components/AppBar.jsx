import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { ScrollView } from 'react-native';
import { Link } from 'react-router-native';

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
      </ScrollView>
    </View>
  );
};

export default AppBar;
