import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';

const reducers = combineReducers({
  searching: searchSlice,
});
const store = configureStore({
  reducer: reducers,
});

export default store;
