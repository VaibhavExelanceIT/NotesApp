/* eslint-disable eqeqeq */
import React, {useRef} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootState} from '../store/mystore';
import {Email, password, Registration} from '../helper/strings';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Please enter valid email'),
  password: Yup.string()
    .label('Password')
    .required('Password is required')
    .matches(/\d/, 'Password must have a number')
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .min(8, ({min}) => `Password must be at least ${min} characters`),
});
interface usertype {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const Password = useRef<TextInput>(null);
  const users: any = useSelector<RootState>(state => state.User.users);

  const user = [...users];
  console.log(user);
  function submitHandler(value: usertype) {
    const arr = user.some(item => {
      if (item.email == value.email && item.password == value.password) {
        return true;
      } else {
        return false;
      }
    });
    if (arr) {
      navigation.navigate('HomeScreen', {email: value.email});
    } else {
      Alert.alert('User Not Found');
    }
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: 'vai@gmail.com',
          password: 'Vai@1234',
        }}
        onSubmit={values => {
          submitHandler(values);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
        }) => (
          <View style={styles.mainlayout}>
            <Text style={styles.textStyle}>{Registration}</Text>

            <TextInput
              autoCorrect={false}
              returnKeyType={'next'}
              value={values.email}
              placeholder={Email}
              placeholderTextColor={'#111111'}
              style={styles.textinputStyle}
              keyboardType="email-address"
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              onSubmitEditing={() => Password.current?.focus()}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              autoCorrect={false}
              returnKeyType={'done'}
              value={values.password}
              placeholder={password}
              placeholderTextColor={'#111111'}
              style={styles.textinputStyle}
              keyboardType="ascii-capable"
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => handleSubmit()}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button onPress={() => handleSubmit()} title="submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 10,
  },
  btnviewstyle: {
    flexDirection: 'row',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
  submitbtn: {backgroundColor: '#AEAEAE'},
  textinputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    padding: 15,
  },

  textStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEAEAE',
    flex: 1,
  },
  mainlayout: {
    padding: 20,
    borderRadius: 20,
    width: '90%',
    backgroundColor: '#000000',
  },
});
