import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import theme from '../theme';
import useRepositories from './useRepositories';

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
    const { repositories, loading, refetch } = useRepositories()

    if (loading) {
        return <Text>Loading...</Text>
    }

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
