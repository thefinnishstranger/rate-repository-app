import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textPrimary,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  countItem: {
    alignItems: 'center',
  },
  countText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  countLabel: {
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item, showGithubButton = false }) => (
  <View style={styles.itemContainer} testID="repositoryItem">
    <View style={styles.header}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.counts}>
      <View style={styles.countItem}>
        <Text style={styles.countText}>{formatCount(item.stargazersCount)}</Text>
        <Text style={styles.countLabel}>Stars</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countText}>{formatCount(item.forksCount)}</Text>
        <Text style={styles.countLabel}>Forks</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countText}>{item.reviewCount}</Text>
        <Text style={styles.countLabel}>Reviews</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countText}>{item.ratingAverage}</Text>
        <Text style={styles.countLabel}>Rating</Text>
      </View>
    </View>
    {showGithubButton && (
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    )}
  </View>
);

export default RepositoryItem;
