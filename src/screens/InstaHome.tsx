import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PostComponent from '../components/PostComponent';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/mystore';

import Heart from '../asset/icon/heart.svg';
import Plus from '../asset/icon/plus.svg';
import Message from '../asset/icon/message.svg';
import Sort from '../asset/icon/sort.svg';
import {Post} from '../slice/PostSlice';

const InstaHome = ({route}: any) => {
  const email = route.params.email;
  console.log(email);
  const navigate = useNavigation<any>();
  const [order, setOrder] = useState<boolean>(false);

  let posts: Array<Post> = useSelector((state: RootState) => state.Post.posts);
  console.log(posts);

  const sort = () => {
    setOrder(!order);
  };
  useEffect(() => {
    posts.reverse();
    console.log(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <View style={styles.mainLAyout}>
      <View style={styles.sortstyle}>
        <View style={styles.userIcon}>
          <Text style={styles.userIcontext}>{email[0]}</Text>
        </View>
        <View style={styles.actionbtn}>
          <Sort
            height={25}
            width={25}
            style={styles.heartstyle}
            onPress={() => {
              sort();
            }}
          />
          <Plus
            height={25}
            width={25}
            onPress={() => {
              navigate.navigate('CreatePost', {email});
            }}
          />
          <View style={styles.heartstyle}>
            <Heart />
          </View>
          <Message />
        </View>
      </View>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PostComponent
            UserEmail={item.email}
            description={item.description}
            title={item.title}
            ImagePost={item.imageOrvideo}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

export default InstaHome;

const styles = StyleSheet.create({
  heartstyle: {
    marginHorizontal: 10,
  },
  actionbtn: {
    flexDirection: 'row',
    padding: 10,
  },
  sortbtnStyle: {
    backgroundColor: '#ffcdf8',
    padding: 10,
    borderRadius: 15,
  },
  sortstyle: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    elevation: 100,
  },
  mainLAyout: {
    backgroundColor: '#FFFFFF',
    // paddingVertical: 20,
    // paddingHorizontal: 10,

    flex: 8,
  },
  fbstyle: {
    width: 50,
    bottom: 30,
    height: 50,
    borderRadius: 50,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#ef8624',
  },
  imgstyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  fbBtnStyle: {
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#000000',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignSelf: 'flex-end',
    // justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  userIcontext: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
});
