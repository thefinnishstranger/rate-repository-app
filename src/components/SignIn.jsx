import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data } = await signIn({ username, password })
      console.log(data);
      if (data.authenticate.accessToken) {
        navigate('/')
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username ? (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      ) : null}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
