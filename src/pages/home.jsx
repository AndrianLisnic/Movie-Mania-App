import { useEffect, useState } from "react";
import backgroundImage from "../assets/background.png";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home-slice";
import MovieSection from "../components/movies-section";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const playingNowList = useSelector((state) => state.home.playingNowList);
  const trendingList = useSelector((state) => state.home.trendingList);

  console.log(playingNowList);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const playingNowUrl =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=1e3d2ab8028e529fc6e3753ff43c9069&language=en-US";
    const trendingUrl =
      "https://api.themoviedb.org/3/trending/all/day?api_key=1e3d2ab8028e529fc6e3753ff43c9069";

    try {
      let [resPlayingNowData, resTrendingData] = await Promise.all([
        fetch(playingNowUrl).then((response) => response.json()),
        fetch(trendingUrl).then((response) => response.json()),
      ]);

      dispatch(homeActions.populatePlayingNowList(resPlayingNowData.results));
      dispatch(homeActions.populateTrendongList(resTrendingData.results));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* semi-transparent layer */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {!loading && (
          <>
            <MovieSection
              sectionName={"NOW PLAYING"}
              itemsList={playingNowList}
            />
            <MovieSection sectionName={"TRENDING"} itemsList={trendingList} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
