// Formik x React Native example
import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Login = ({navigation}) => {
  
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    photo: Yup.string().required('Required'),
  });

  const onSubmitHandler = values => {
    console.log('details',values)
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User signed in!');
        navigation.navigate('Lobby',{user:values})
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmitHandler}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.input}
            placeholder="PassWord"
            // secureTextEntry={true}
          />

          <Button onPress={handleSubmit} title="Login" />
          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
            <Text>Don't Have an Acoount ? Create Here</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 2,
  },
  btn: {
    marginBottom: 4,
  },
});
