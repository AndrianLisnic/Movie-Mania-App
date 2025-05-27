import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    playingNowList: [],
    trendingList: [],
    favoritesList: [],
  },
  reducers: {
    populatePlayingNowList(state, action) {
      state.playingNowList = action.payload;
    },
    populateTrendongList(state, action) {
      state.trendingList = action.payload;
    },
    addToFavorites(state, action) {
      console.log(action.payload);
      state.favoritesList.push(action.payload);
    }
  },
});

export default homeSlice;
export const homeActions = homeSlice.actions;
