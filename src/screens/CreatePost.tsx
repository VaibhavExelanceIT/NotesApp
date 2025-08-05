import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import ImagePicker from 'react-native-image-crop-picker';

import {useDispatch} from 'react-redux';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import {addPost} from '../slice/PostSlice';
import {useNavigation} from '@react-navigation/native';

const CreatePost = ({route}: any) => {
  const [title, SetTitle] = useState<string>();
  const [desc, SetDesc] = useState<string>();
  const [uri, setUri] = useState<string[]>([]);
  const [videoUri, setVideoUri] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const email = route.params.email;

  // const posts: any = useSelector<RootState>(state => state.Post.posts);
  // console.log(posts);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const DateAndTime = `${day}:${month}:${year}:${hours}:${minutes}`;

  const platformname =
    Platform.OS === 'android'
      ? RNFS.DownloadDirectoryPath
      : RNFS.DocumentDirectoryPath;
  // console.log(platformname);

  const createPaths = (): string[] => {
    const tempPaths: string[] = [];
    [...uri, ...videoUri].map(item => {
      const extension = item.split('.').pop();

      const path =
        platformname + '/' + Date.now() + Math.random() + '.' + extension;

      RNFS.copyFile(item, path);
      tempPaths.push('file://raw:' + path);
    });

    return tempPaths;
  };

  const submitHandler = () => {
    const finalPaths = createPaths();
    dispatch(
      addPost({
        email: email,
        title: title,
        description: desc,
        imageOrvideo: finalPaths,
        date: DateAndTime,
      }),
    );

    navigation.goBack('InstaHome');
  };

  const imageGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const img = image.map(item => {
        return item.path;
      });
      // console.log(img);
      setUri(img);
    });
  };

  const VideoGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true,
    }).then(video => {
      const videourl: any = video.map(item => {
        return item.path;
      });
      // console.log(videourl);
      setVideoUri(videourl);
    });
  };

  return (
    <View style={styles.mainLayout}>
      <View style={styles.modalstyle}>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.createPost}>Create Post</Text>
          <TextInput
            placeholder="Enter Title here"
            style={styles.textInputStyle}
            value={title}
            onChangeText={e => SetTitle(e)}
            keyboardType="ascii-capable"
          />
          <TextInput
            placeholder="Enter Description here"
            style={styles.textInputStyle}
            value={desc}
            onChangeText={e => SetDesc(e)}
            numberOfLines={3}
            multiline={true}
          />

          <View style={styles.postUploadStyle}>
            {uri.length > 0 ? (
              <FlatList
                data={uri}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <Image style={styles.imgstyle} src={item} alt="image" />
                )}
              />
            ) : (
              <TouchableOpacity
                style={styles.imagepost}
                onPress={() => {
                  imageGallery();
                }}>
                <Text>{'Add Images'}</Text>
              </TouchableOpacity>
            )}

            {videoUri.length > 0 ? (
              <FlatList
                data={videoUri}
                horizontal={true}
                renderItem={({item}) => (
                  <Video
                    style={styles.imgstyle}
                    onBuffer={e => {
                      e.isBuffering;
                    }}
                    onError={e => {
                      e.error;
                    }}
                    controls={true}
                    source={{uri: item}}
                  />
                )}
              />
            ) : (
              <TouchableOpacity
                style={styles.imagepost}
                onPress={() => {
                  VideoGallery();
                }}>
                <Text>{'Add Videos'}</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.btnstyle} onPress={submitHandler}>
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  btnstyle: {
    marginVertical: 10,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 20,
  },
  modalstyle: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  mainLayout: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  scrollview: {
    margin: 10,
  },
  textInputStyle: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  postUploadStyle: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  imagepost: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  createPost: {fontSize: 23, fontWeight: '600', textAlign: 'center'},
  imgstyle: {
    padding: 10,
    margin: 10,
    height: 200,
    width: 200,
  },
});
