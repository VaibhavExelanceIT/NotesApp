/* eslint-disable eqeqeq */
import React, {useRef} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootState} from '../store/mystore';
import {addUser} from '../slice/UserSlice';
import {Email, password, Registration, UserName} from '../helper/strings';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name is required').label('Name'),
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
  username: string;
  email: string;
  password: string;
}

const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const email = useRef<TextInput>(null);
  const Password = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const users: any = useSelector<RootState>(state => state.User.users);

  const user = [...users];
  console.log(user);
  function successfully(value: usertype) {
    dispatch(
      addUser({
        UserName: value.username,
        email: value.email,
        password: value.password,
      }),
    );
    navigation.navigate('LoginScreen');
  }
  console.log('User length', user.length);
  function loginbtn() {
    navigation.navigate('LoginScreen');
  }
  function submitHandler(value: usertype) {
    if (user.length > 0) {
      const arr = user.some(item => {
        if (item.email == value.email && item.password == value.password) {
          return true;
        } else {
          return false;
        }
      });
      if (arr) {
        Alert.alert('User Already  Exsits');
      } else {
        successfully(value);
      }
    } else {
      successfully(value);
    }
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
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
              placeholder={UserName}
              value={values.username}
              keyboardType="ascii-capable"
              style={styles.textinputStyle}
              onBlur={handleBlur('username')}
              placeholderTextColor={'#111111'}
              onChangeText={handleChange('username')}
              onSubmitEditing={() => email.current?.focus()}
            />
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              autoCorrect={false}
              placeholder={Email}
              value={values.email}
              returnKeyType={'next'}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              style={styles.textinputStyle}
              placeholderTextColor={'#111111'}
              onChangeText={handleChange('email')}
              onSubmitEditing={() => Password.current?.focus()}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              autoCorrect={false}
              returnKeyType={'done'}
              placeholder={password}
              value={values.password}
              keyboardType="ascii-capable"
              style={styles.textinputStyle}
              onBlur={handleBlur('password')}
              placeholderTextColor={'#111111'}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => handleSubmit()}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button onPress={() => handleSubmit()} title="submit" />
            <View style={styles.btnspace} />
            <Button onPress={() => loginbtn()} title="Login" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  btnspace: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: '800',
    marginBottom: 10,
  },
  btnviewstyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  textinputStyle: {
    padding: 15,
    fontSize: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontWeight: '600',
    backgroundColor: 'white',
  },

  textStyle: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AEAEAE',
  },
  mainlayout: {
    padding: 20,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#000000',
  },
});
