import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    playingNowList: [],
    trendingList: [],
  },
  reducers: {
    populatePlayingNowList(state, action) {
      state.playingNowList = action.payload;
    },
    populateTrendongList(state, action) {
      state.trendingList = action.payload;
    },
  },
});

export default homeSlice;
export const homeActions = homeSlice.actions;
