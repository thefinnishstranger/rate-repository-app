import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import format from 'date-fns/format';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createdAt: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  text: {
    color: theme.colors.textPrimary,
  },
});

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <Text style={styles.createdAt}>{format(new Date(createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ReviewItem;
