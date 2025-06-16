/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {RootState} from '../store/mystore';
import {logout, plus} from '../helper/image';
import NoteComponent from '../components/NoteComponent';
import {addNote, deleteNote, Notes} from '../slice/NoteSlice';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').label('Name'),
  description: Yup.string().required('Description is required').label('Name'),
});

let data: Notes[];
let ID: string;
const HomeScreen = ({route}: any) => {
  const [filteredData, setFilteredData] = useState<Notes[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Id, setId] = useState<String>();
  console.log('🚀 ~ HomeScreen ~ filteredData:', filteredData);
  const navigation = useNavigation<any>();
  const notes = useSelector<RootState>(state => state.Note.notes) as Notes[];
  const dispatch = useDispatch();

  const note: Notes[] = [...notes];
  const email = route.params.email;
  // console.log(note);

  useEffect(() => {
    data = note.filter(val => {
      return email == val.email;
    });
    setFilteredData(data);
    ID = 'id' + Math.random().toString(16).slice(2);
    setId(ID);
  }, [notes]);

  function submitHandler(value: Notes) {
    // console.log(value);
    // console.log(ID);
    dispatch(
      addNote({
        id: Id,
        title: value.title,
        description: value.description,
        email: email,
      }),
    );
    setModalVisible(!modalVisible);
  }

  function deletebtn(id: string | undefined) {
    console.log(id);
    dispatch(deleteNote(id));
  }

  function updatebtn(id: string | undefined) {
    // let idx = note.map(temp => temp.id).indexOf(id);÷
    navigation.navigate('EditScreen', {index: id});
  }
  function logoutbtn() {
    navigation.reset({
      index: 1,
      routes: [{name: 'LoginScreen'}],
    });
  }

  return (
    <View style={styles.mainlayout}>
      <View style={styles.upperscreen}>
        <View style={styles.userIcon}>
          <Text style={styles.userIcontext}>{email[0]}</Text>
        </View>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <NoteComponent
              NoteDescription={item.description}
              NoteTitle={item.title}
              deletefuncion={() => deletebtn(item.id)}
              updatefunction={() => updatebtn(item.id)}
            />
          )}
        />

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Note not saved');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                }}
                onSubmit={submitHandler}
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
                    <TextInput
                      autoCorrect={false}
                      value={values.title}
                      style={styles.title}
                      returnKeyType={'next'}
                      onBlur={handleBlur('title')}
                      placeholder="Enter the title"
                      onChangeText={handleChange('title')}
                    />
                    {errors.title && touched.title && (
                      <Text style={styles.errortext}>{errors.title}</Text>
                    )}
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      autoCorrect={false}
                      returnKeyType={'next'}
                      style={styles.description}
                      value={values.description}
                      onBlur={handleBlur('description')}
                      placeholder="Enter the Description"
                      onChangeText={handleChange('description')}
                    />
                    {errors.description && touched.description && (
                      <Text style={styles.errortext}>{errors.description}</Text>
                    )}
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.textStyle}>{'submit'}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.fbView}>
        <TouchableOpacity style={styles.logoutbtn} onPress={logoutbtn}>
          <Image style={styles.imgstyle} source={logout} />
          <Text style={styles.logoutText}>{'Logout'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fbstyle}
          onPress={() => setModalVisible(true)}>
          <Image style={styles.imgstyle} source={plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  errortext: {
    color: 'red',
    marginTop: -10,
    marginBottom: 10,
  },
  title: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  userIcontext: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  logoutText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'center',
  },
  logoutbtn: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  upperscreen: {
    flex: 1,
  },
  fbView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fbstyle: {
    right: 20,
    width: 60,
    bottom: 30,
    height: 60,
    borderRadius: 50,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#91cef2',
  },
  imgstyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  mainlayout: {
    flex: 1,
    padding: 30,
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '90%',
    padding: 30,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    elevation: 2,
    borderRadius: 20,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
