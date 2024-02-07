import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../https.interceptors';

export const fetchChannels: any = createAsyncThunk('channels/fetchChennels', async () => {
  try {
    const res = await axios.get('/stations');
    return res.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
});

interface channelState {
  data: any[],
  rows: number,
  status: string,
  loading: boolean
}

const initialState: channelState = {
  data: [],
  rows: 10,
  status: "",
  loading: true
}

const channelSlice = createSlice({
  name: 'getChannel',
  initialState,
  reducers: {
    incrementCurrentPage: (state) => {
      state.rows += 10
    },
    favourite: (state, { payload }) => {
      const favoriteItem: any = [];

      const favorite: any = {
        id: payload
      }

      const storage = localStorage.getItem('favorite');

      if (storage !== null) {
        favoriteItem.push(favorite);
        localStorage.setItem('favorite', JSON.stringify(favoriteItem))
      }

      const newState = state.data.map((item) => {
        if (item.id !== payload) return item;
        return { ...item, favorited: !item.favorited }
      });
      state.data = newState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = ''
        state.loading = true;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const newState:any = [];
        payload.map((item: any) => newState.push({
          name: item.name,
          country: item.country,
          favicon: item.favicon,
          homepage: item.homepage,
          url_resolved: item.url_resolved,
          favorited: false,
          id: item.stationuuid,
        }));
        state.data = newState;
        state.loading = false;
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.loading = false;
        state.status = 'failed to load content, try refreshing your browser'
      });
  }
})

export default channelSlice.reducer;
export const { incrementCurrentPage, favourite } = channelSlice.actions;
