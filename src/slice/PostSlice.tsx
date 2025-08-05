import {createSlice} from '@reduxjs/toolkit';

export interface Post {
  email: string;
  title: string;
  description: string;
  imageOrvideo: Array<string>;
  date: string;
}

const initialState: {
  posts: Post[];
} = {
  posts: [],
};

const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const {addPost} = PostSlice.actions;
export default PostSlice.reducer;
