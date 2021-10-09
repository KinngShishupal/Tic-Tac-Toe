// Formik x React Native example
import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignUp = ({navigation}) => {
  const [imageUrl, setImageUrl] = useState('')
  const initialValues = {
    userName: '',
    password: '',
    email: '',
    photo:''
  
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

//   Image PIcker
const imageSelectHandler = () =>{

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      try {
        const fileName = image.path.substring(image.path.lastIndexOf('/')+1);
        console.log('filename', fileName)
      await storage().ref(fileName).putFile(image.path);
      alert('image uploaded sucessfully');
      const url = await storage().ref(fileName).getDownloadURL();
      console.log('url', url)
      setImageUrl(url)

      } catch (error) {
        alert('sorry')
      }
    }).catch(err=>console.log(err))
    
  };

  const onSubmitHandler =(values)=>{
 const output = {...values,photo:imageUrl};
// create a user
auth()
  .createUserWithEmailAndPassword(values.email, values.password)
  .then(() => {
    console.log('User account created & signed in!');
    // adding user details to firestore as well
    firestore()
  .collection('Players')
  .add(output)
  .then(() => {
    console.log('User added!');
  }).catch(()=>console.log('player not added'))
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });



//  

 
 
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmitHandler}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <View>
          <TextInput
            onChangeText={handleChange('userName')}
            onBlur={handleBlur('userName')}
            value={values.userName}
            style={styles.input}
            placeholder='User Name'
          />

          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.input}
            placeholder='PassWord'
            secureTextEntry={true} 
          />

          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.input}
            placeholder='Email'
          />

          <Button 
          title="select Profile Picture" 
          color="#841584" 
          style={styles.btn}
          onPress={()=>imageSelectHandler(setFieldValue)}
          />

          <Button onPress={handleSubmit} title="Submit" />
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text>Already Have an Acoount ? Login Here</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;


const styles = StyleSheet.create({
    input:{
        borderColor:'#000',
        borderWidth:1,
        marginBottom:2
    },
    btn:{
        marginBottom:4
    }
})