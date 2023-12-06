import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../https.interceptors';

export const fetchChannels: any = createAsyncThunk('channels/fetchChennels', async (arg) => {
  try {
    const res = await axios.get('/stations', {
      params: {
        offset: '0',
        limit: arg,
      },
    });
    return res.data
  } catch (error) {
    throw error;
  }

});

interface channelState {
  data: any[],
  currentPage: number,
  rows: number,
  totalPage: any[],
  status: string,
  loading: boolean
}

const initialState: channelState = {
  data: [],
  currentPage: 1,
  rows: 10,
  totalPage: ['1','2','3','4'],
  status: "",
  loading: true
}

const channelSlice = createSlice({
  name: 'getChannel',
  initialState,
  reducers: {
    incrementCurrentPage: (state) => {
      if (state.currentPage <= state.totalPage.length - 1) {
        state.currentPage ++;
        state.rows += 10
      }
    },
    decreaseCurrentPage: (state) => {
      if (state.currentPage >= 2) {
        state.currentPage --;
        state.rows -= 10
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = ''
        state.loading = true;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.data = payload;
        console.log(payload)
        state.loading = false;
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.loading = false;
        state.status = 'failed to load content, try refreshing your browser'
      });
  }
})

export default channelSlice.reducer;
export const { incrementCurrentPage, decreaseCurrentPage } = channelSlice.actions;
