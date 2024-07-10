import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerUsername: yup.string().required('Repository owner\'s username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0, 'Rating must be between 0 and 100').max(100, 'Rating must be between 0 and 100'),
  review: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigation = useNavigate(); // Use useNavigation hook for navigation

  const handleSubmit = async (values) => {
    const { ownerUsername, repositoryName, rating, review } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            repositoryName,
            ownerUsername,
            rating: Number(rating),
            text: review || undefined, // Send undefined if review is empty
          }
        }
      });
      const repositoryId = data.createReview.repository.id;
      navigation.navigate(`/repository/${repositoryId}`); // Navigate to the repository view
    } catch (error) {
      console.error('Failed to create review:', error);
    }
  };

  return (
    <Formik
      initialValues={{ ownerUsername: '', repositoryName: '', rating: '', review: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            label="Repository owner's username"
            onChangeText={handleChange('ownerUsername')}
            onBlur={handleBlur('ownerUsername')}
            value={values.ownerUsername}
            style={styles.input}
            error={touched.ownerUsername && errors.ownerUsername}
          />
          {touched.ownerUsername && errors.ownerUsername && <Text style={styles.errorText}>{errors.ownerUsername}</Text>}
          
          <TextInput
            label="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            style={styles.input}
            error={touched.repositoryName && errors.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}
          
          <TextInput
            label="Rating (0-100)"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            style={styles.input}
            keyboardType="numeric"
            error={touched.rating && errors.rating}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
          
          <TextInput
            label="Review"
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            style={styles.input}
            multiline
          />
          
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
