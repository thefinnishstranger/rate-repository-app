// RepositoryList.jsx

import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import theme from '../theme';
import useRepositories from './useRepositories';
import RepositoryItemWrapper from './RepositoryItemWrapper';
import OrderingSelector from './OrderingSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textPrimary,
  },
});

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT'); // Default to Latest repositories
  const { repositories, loading, refetch } = useRepositories({ orderBy });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = repositories || [];

  return (
    <View style={styles.container}>
      <OrderingSelector orderBy={orderBy} setOrderBy={setOrderBy} />
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItemWrapper item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RepositoryList;
