import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "home",
	initialState: {
		playingNowList: [],
	},
	reducers: {
		populatePlayingNowList(state, action) {
			state.playingNowList = action.payload;
		},
	},
});

export default homeSlice;
export const homeActions = homeSlice.actions;
