import { useEffect, useState } from "react";
import backgroundImage from "../assets/background.png";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home-slice";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [playingNowCount, setPlayingNowCount] = useState(10);
  const [trendingCount, setTrendingCount] = useState(10);

  const playingNowList = useSelector((state) => state.home.playingNowList);
  const trendingList = useSelector((state) => state.home.trendingList);

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

      console.log(resPlayingNowData.results);
      console.log(resTrendingData.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayingNowShowMore = () => {
    setPlayingNowCount(playingNowCount === 10 ? 20 : 10);
  };

  const handleTrendingShowMore = () => {
    setTrendingCount(trendingCount === 10 ? 20 : 10);
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
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                sm: "24px",
                md: "24px",
                lg: "36px",
              },
              fontWeight: 700,
              letterSpacing: 3,
              p: "8px 22px",
              textAlign: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "left",
              },
            }}
          >
            NOW PLAYING
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "wrap",
              m: "0 24px",
              gap: 2,
            }}
          >
            {!loading &&
              playingNowList.map((item, index) => {
                if (index < playingNowCount) {
                  return (
                    <Box
                      component="img"
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                      alt={item.original_title}
                      key={index}
                      sx={{
                        width: "270px",
                        height: "auto",
                        borderRadius: "12px",
                        mb: "12px",
                      }}
                    ></Box>
                  );
                }
              })}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handlePlayingNowShowMore}
              variant="outlined"
              sx={{
                borderColor: "#D86D2E",
                borderRadius: "9px",
                color: "whitesmoke",
                p: "1px 10px",
                mb: "24px",
              }}
            >
              {`Show ${playingNowCount === 10 ? "more" : "less"}`}
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                sm: "24px",
                md: "24px",
                lg: "36px",
              },
              fontWeight: 700,
              letterSpacing: 3,
              p: "8px 22px",
              textAlign: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "left",
              },
            }}
          >
            TRENDING
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "wrap",
              m: "0 24px",
              gap: 2,
            }}
          >
            {!loading &&
              trendingList.map((item, index) => {
                if (index < trendingCount) {
                  return (
                    <Box
                      component="img"
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                      alt={item.original_title}
                      key={index}
                      sx={{
                        width: "270px",
                        height: "auto",
                        borderRadius: "12px",
                        mb: "12px",
                      }}
                    ></Box>
                  );
                }
              })}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleTrendingShowMore}
              variant="outlined"
              sx={{
                borderColor: "#D86D2E",
                borderRadius: "9px",
                color: "whitesmoke",
                p: "1px 10px",
                mb: "24px",
              }}
            >
              {`Show ${trendingCount === 10 ? "more" : "less"}`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
