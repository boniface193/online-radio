import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './reducers/channelSlice';
import countrySlice from './reducers/countrySlice';
import searchSlice from './reducers/searchSlice';

const store = configureStore({
  reducer: {
    channelSlice,
    countrySlice,
    searchSlice,
  },
})

export default store