/* eslint-disable eqeqeq */
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

import {RootState} from '../store/mystore';
import {Notes, updateNote} from '../slice/NoteSlice';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required').label('Name'),
  description: Yup.string().required('Description is Required').label('Name'),
});

const EditScreen = ({route}: any) => {
  const notes = useSelector<RootState>(state => state.Note.notes) as Notes[];

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const note = [...notes];

  console.log(note);
  const res = route.params.index;

  const filterdata = note.filter(val => {
    return val.id == res;
  });
  console.log(filterdata);

  console.log(res);
  function submitHandler(value: Notes) {
    dispatch(updateNote({idx: res, data: value}));
    console.log(res);
    console.log(value);
    navigate.goBack();
  }
  return (
    <View style={styles.mainview}>
      <Text style={styles.styledit}>{'Update Form'}</Text>
      <View style={styles.lineview} />
      <Formik
        initialValues={{
          title: filterdata[0].title,
          description: filterdata[0].description,
          email: filterdata[0].email,
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
          <>
            <Text style={styles.titlestyle}>{'Title'}</Text>
            <TextInput
              placeholder="title"
              autoCorrect={false}
              style={styles.title}
              value={values.title}
              returnKeyType={'next'}
              onBlur={handleBlur('title')}
              onChangeText={handleChange('title')}
            />
            {errors.title && touched.title && (
              <Text style={styles.errortext}>{errors.title}</Text>
            )}

            <Text style={styles.titlestyle}>{'Description'}</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              autoCorrect={false}
              returnKeyType={'next'}
              placeholder={'description'}
              style={styles.description}
              value={values.description}
              onBlur={handleBlur('description')}
              onChangeText={handleChange('description')}
            />
            {errors.description && touched.description && (
              <Text style={styles.errortext}>{errors.description}</Text>
            )}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => handleSubmit()}>
              <Text style={styles.textStyle}>submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  lineview: {
    marginBottom: 20,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  styledit: {
    fontSize: 30,
    fontWeight: '800',
    alignSelf: 'center',
  },
  titlestyle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: -10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 10,
    elevation: 2,
    borderRadius: 20,
    backgroundColor: '#333333',
  },
  mainview: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: '500',
    marginVertical: 10,
  },
  errortext: {
    color: 'red',
    marginTop: -10,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: '500',
    marginVertical: 10,
  },
});
