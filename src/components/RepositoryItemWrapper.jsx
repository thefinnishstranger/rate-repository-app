import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';

const RepositoryItemWrapper = ({ item }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/repository/${item.id}`);
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <RepositoryItem item={item} />
      </Pressable>
    </View>
  );
};

export default RepositoryItemWrapper;
