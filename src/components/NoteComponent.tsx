import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {del, edit} from '../helper/image';

interface ComponentProp {
  NoteTitle: string;
  NoteDescription: string;
  deletefuncion: Function;
  updatefunction: Function;
}

const NoteComponent: React.FC<ComponentProp> = props => {
  const {NoteTitle, NoteDescription, deletefuncion, updatefunction} =
    props || {};
  return (
    <View style={styles.container}>
      <View style={styles.bntview}>
        <TouchableOpacity
          style={styles.btneditstyle}
          onPress={() => updatefunction()}>
          <Image style={styles.imgstyle} source={edit} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btndeletestyle}
          onPress={() => deletefuncion()}>
          <Image style={styles.imgstyle} source={del} />
        </TouchableOpacity>
      </View>
      <Text style={styles.titlestyle}>{'Title: ' + NoteTitle}</Text>
      <Text style={styles.NoteDescription}>
        {'Description: ' + NoteDescription}
      </Text>
    </View>
  );
};

export default NoteComponent;

const styles = StyleSheet.create({
  imgstyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bntview: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  btndeletestyle: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: '#f7330f',
  },
  btneditstyle: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: '#41bd04',
  },
  titlestyle: {
    fontSize: 16,
    marginTop: 12,
  },
  NoteDescription: {
    color: 'grey',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
});
