import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../https.interceptors';

export const fetchCountry: any = createAsyncThunk('country/fetchCountry', async () => {
  try {
    const res = await axios.get('/countries');
    return await res.data
  } catch (error) {
    throw error;
  }
});

interface countryState {
  data: any[],
  status: string,
  loading: boolean,
  searchedCountry: any[]
}

const initialState: countryState = {
  data: [],
  status: '',
  loading: true,
  searchedCountry: []
}

const countrySlice = createSlice({
  name: 'getCountry',
  initialState,
  reducers: {
    getFormValue: (state, { payload }) => {
      try {
        state.searchedCountry = state.data.filter((item) => item.name.toLowerCase().indexOf(payload) > -1);
        if (state.searchedCountry.length < 1) {
          state.status = 'Ops! Nothing'
        } else {
          state.status = ''
        }
      } catch (error) {
        throw error
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.status = ''
        state.loading = true;
      })
      .addCase(fetchCountry.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.searchedCountry = state.data
        state.loading = false;
      })
      .addCase(fetchCountry.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = 'failed to load content, try refreshing your browser';
      });
  }
})

export default countrySlice.reducer;
export const { getFormValue } = countrySlice.actions;
