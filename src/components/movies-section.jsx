import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { FavoriteBorderOutlined, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home-slice";

const MovieSection = ({ sectionName, itemsList }) => {
  const [playingNowCount, setPlayingNowCount] = useState(10);

  const favoritesList = useSelector((state) => state.home.favoritesList);

  const dispatch = useDispatch();

  const handlePlayingNowShowMore = () => {
    setPlayingNowCount(playingNowCount === 10 ? 20 : 10);
  };

  const addItemToFavorites = (item) => {
    dispatch(homeActions.addToFavorites(item));
  };

  return (
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
        {sectionName}
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
        {itemsList.map((item, index) => {
          if (index < playingNowCount) {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  width: "270px",
                  mb: "12px",
                  "&:hover .hoverOverlay": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  alt={item.original_title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                ></Box>
                <Box
                  className="hoverOverlay"
                  sx={{
                    width: "95%",
                    height: "40%",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    position: "absolute",
                    bottom: "6px",
                    borderRadius: "12px",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      letterSpacing: 3,
                      textAlign: "center",
                      m: "9px",
                    }}
                  >
                    {item.original_title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      position: "absolute",
                      bottom: "6px",
                      mx: "9px",
                      width: "90%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ color: "#D86D2E" }}>{item.release_date}</Box>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => addItemToFavorites(item)}
                    >
                      <FavoriteBorderOutlined sx={{ color: "#D86D2E" }} />
                      <Favorite sx={{ color: "#D86D2E" }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
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
  );
};

export default MovieSection;
