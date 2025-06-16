/* eslint-disable eqeqeq */
import {createSlice} from '@reduxjs/toolkit';

export interface Notes {
  id?: string;
  title: string;
  description: string;
  email?: string;
}

const initialState: {
  notes: Notes[];
} = {
  notes: [],
};

const NoteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const id = action.payload.idx;
      const data = action.payload.data;
      console.log(id);
      console.log(data);
      console.log(data.title);
      console.log(data.description);

      // console.log(state.notes[action.payload.idx]);
      const revisedData = state.notes.map(val => {
        if (val.id == id) {
          return {
            id: val.id,
            title: data.title,
            description: data.description,
            email: val.email,
          };
        } else {
          return {
            id: val.id,
            title: val.title,
            description: val.description,
            email: val.email,
          };
        }
      });
      console.log(revisedData);
      state.notes = revisedData;
    },
    deleteNote: (state, action) => {
      const filterdata = state.notes.filter(cv => {
        return cv.id !== action.payload;
      });
      console.log('filtered data ', filterdata);

      state.notes = filterdata;
      console.log(state.notes);
    },
  },
});

export const {addNote, updateNote, deleteNote} = NoteSlice.actions;
export default NoteSlice.reducer;
