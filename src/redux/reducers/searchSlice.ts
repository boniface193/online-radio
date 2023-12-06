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
  rows: number,
  lessThan10: boolean,
  status: string,
  loading: boolean
}

const initialState: searchState = {
  data: [],
  rows: 10,
  lessThan10: false,
  status: "",
  loading: false
}

const searchSlice = createSlice({
  name: 'getSearch',
  initialState,
  reducers: {
    loadMore: (state) => {
        state.rows += 10
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = ''
        state.loading = true;
      })
      .addCase(fetchSearch.fulfilled, (state, { payload }) => {
        if (payload.data.length > 9) {
          state.lessThan10 = true
        }
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
export const { loadMore } = searchSlice.actions;
