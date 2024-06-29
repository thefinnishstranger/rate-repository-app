import React from 'react';
import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import theme from '../theme';

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
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const formatCount = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
}

const RepositoryItem = ({ item }) => (
  <View style={styles.itemContainer}>
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
  </View>
);

const RepositoryList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RepositoryList;
