import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserReducer from '../slice/UserSlice';
import NoteReducer from '../slice/NoteSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  User: UserReducer,
  Note: NoteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const mystore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(mystore);
export type RootState = ReturnType<typeof mystore.getState>;
export type AppDispatch = typeof mystore.dispatch;
