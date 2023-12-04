import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../https.interceptors';

interface Parameters {
  searchName: string,
  limit: number,
}

export const fetchSearch: any = createAsyncThunk('search/fetchSearch', async (arg: Parameters) => {

  try {
    const res = await axios.get(`/stations/byname/${arg.searchName}`, {
      params: {
        offset: '0',
        limit: arg.limit,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
});

interface searchState {
  data: any[],
  currentPage: number,
  rows: number,
  totalPage: any[],
  status: string,
  loading: boolean
}

const initialState: searchState = {
  data: [],
  currentPage: 1,
  rows: 10,
  totalPage: ['1', '2', '3', '4'],
  status: "",
  loading: false
}

const searchSlice = createSlice({
  name: 'getSearch',
  initialState,
  reducers: {
    incrementCurrentPage: (state) => {
      if (state.currentPage <= state.totalPage.length - 1) {
        state.currentPage++;
        state.rows += 10
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
        state.data = payload.data;
        state.loading = false;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.status = 'failed to load content, try refreshing your browser'
      });
  }
})

export default searchSlice.reducer;
export const { incrementCurrentPage } = searchSlice.actions;
