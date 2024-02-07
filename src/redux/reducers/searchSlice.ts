import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../https.interceptors';

interface Parameters {
  searchName: string,
  limit: number,
}

export const fetchSearch: any = createAsyncThunk('search/fetchSearch', async (arg: Parameters) => {

  try {
    const res = await axios.get(`/stations`);
    return res.data;
  } catch (error) {
    throw error;
  }
});

interface searchState {
  data: any[],
  searchedResult: any[],
  rows: number,
  lessThan10: boolean,
  status: string,
  loading: boolean
}

const initialState: searchState = {
  data: [],
  searchedResult: [],
  rows: 10,
  lessThan10: false,
  status: "",
  loading: false
}

const searchSlice = createSlice({
  name: 'getSearch',
  initialState,
  reducers: {
    getFormValue: (state, { payload }) => {
      try {
        const results = state.data.filter((item) => item.name.toLowerCase().indexOf(payload) > -1);
        if (results.length < 1) {
          state.status = 'Ops! Nothing'
          state.searchedResult = [];
        } else {
          state.status = ''
          state.searchedResult = results;
        }
      } catch (error) {
        throw error
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = ''
        state.loading = true;
      })
      .addCase(fetchSearch.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.status = 'failed to load content, try refreshing your browser'
      });
  }
})

export default searchSlice.reducer;
export const { getFormValue } = searchSlice.actions;
