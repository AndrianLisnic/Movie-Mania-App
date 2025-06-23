import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async () => {
    const playingNowUrl =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=1e3d2ab8028e529fc6e3753ff43c9069&language=en-US";
    const trendingUrl =
      "https://api.themoviedb.org/3/trending/all/day?api_key=1e3d2ab8028e529fc6e3753ff43c9069";

    const [resPlayingNowData, resTrendingData] = await Promise.all([
      fetch(playingNowUrl).then((response) => response.json()),
      fetch(trendingUrl).then((response) => response.json()),
    ]);

    return {
      playingNow: resPlayingNowData,
      trending: resTrendingData,
    };
  }
);

// export const fetchHomeData = () => async (dispatch) => {
//   const playingNowUrl =
//     "https://api.themoviedb.org/3/movie/now_playing?api_key=1e3d2ab8028e529fc6e3753ff43c9069&language=en-US";
//   const trendingUrl =
//     "https://api.themoviedb.org/3/trending/all/day?api_key=1e3d2ab8028e529fc6e3753ff43c9069";

//   try {
//     const [resPlayingNowData, resTrendingData] = await Promise.all([
//       fetch(playingNowUrl).then((response) => response.json()),
//       fetch(trendingUrl).then((response) => response.json()),
//     ]);

//     dispatch(homeActions.populatePlayingNowList(resPlayingNowData.results));
//     dispatch(homeActions.populateTrendingList(resTrendingData.results));
//   } catch (error) {
//     console.error("Failed to fetch home data", error);
//     dispatch(homeActions.setError(error.message));
//   } finally {
//     dispatch(homeActions.setLoading(false));
//   }
// };

const homeSlice = createSlice({
  name: "home",
  initialState: {
    playingNowList: [],
    trendingList: [],
    watchList: [],
    loading: false,
    error: null,
  },
  reducers: {
    populatePlayingNowList(state, action) {
      state.playingNowList = action.payload;
    },
    populateTrendingList(state, action) {
      state.trendingList = action.payload;
    },
    addOrRemoveWatchItem(state, action) {
      //   console.log(action.payload);
      if (state.watchList.map((item) => item.id).includes(action.payload.id)) {
        state.watchList = state.watchList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.watchList.push(action.payload);
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.playingNowList = action.payload.playingNow.results;
        state.trendingList = action.payload.trending.results;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default homeSlice;
export const homeActions = homeSlice.actions;
