import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';
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
  username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters').max(30, 'Username must be at most 30 characters'),
  password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters').max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUpForm = () => {
  const [createUser] = useMutation(SIGNUP);
  const { signIn } = useSignIn();
  const history = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      if (data.createUser) {
        await signIn({ username, password }); // Sign in the user after successful registration
        history.push('/'); // Redirect to the reviewed repositories list view
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      setStatus({ error: 'Failed to sign up. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, status }) => (
        <View style={styles.container}>
          <TextInput
            label="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            style={styles.input}
            error={touched.username && errors.username}
          />
          {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          
          <TextInput
            label="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.input}
            secureTextEntry
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          
          <TextInput
            label="Confirm Password"
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            style={styles.input}
            secureTextEntry
            error={touched.passwordConfirmation && errors.passwordConfirmation}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>}
          
          {status && status.error && <Text style={[styles.errorText, { textAlign: 'center' }]}>{status.error}</Text>}
          
          <Button onPress={handleSubmit} title="Sign Up" disabled={isSubmitting} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
