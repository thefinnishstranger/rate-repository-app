import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native'; // Import useNavigate instead of useHistory
import { CREATE_REVIEW } from '../graphql/queries';
import ReviewForm from './ReviewForm';

const CreateReview = () => {
  const [mutate, { loading }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate(); // Use useNavigate to get navigation functionality

  const onSubmit = async (values) => {
    const { ownerUsername, repositoryName, rating, review } = values;
    try {
      const { data } = await mutate({
        variables: { review: { repositoryName, ownerUsername, rating: Number(rating), text: review } },
      });
      const repositoryId = data.createReview.repository.id;
      navigate(`/repository/${repositoryId}`); // Use navigate to redirect after mutation
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <ReviewForm onSubmit={onSubmit} />
  );
};

export default CreateReview;
