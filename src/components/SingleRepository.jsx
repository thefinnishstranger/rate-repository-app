import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem'; // Assuming you have a ReviewItem component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  reviewSeparator: {
    height: 10,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REPOSITORY, {
    variables: { id },
  });

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  const repository = data.repository;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} showGithubButton />

      <FlatList
        data={repository.reviews.edges.map(edge => edge.node)}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
      />
    </View>
  );
};

export default SingleRepository;
