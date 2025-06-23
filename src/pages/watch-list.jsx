import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home-slice";
import Tooltip from "@mui/material/Tooltip";

const WatchList = () => {
  const [playingNowCount, setPlayingNowCount] = useState(10);

  const watchList = useSelector((state) => state.home.watchList);
  console.log(watchList.map((item) => item.id));

  const dispatch = useDispatch();

  const addOrRemoveWatchItem = (item) => {
    dispatch(homeActions.addOrRemoveWatchItem(item));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          m: "24px 0",
          gap: 2,
        }}
      >
        {watchList.map((item, index) => {
          if (index < playingNowCount) {
            return (
              <Box
                sx={{
                  border: "1px solid black",
                  width: "49%",
                  height: "375px",
                  borderRadius: "12px",
                  display: "flex",
                }}
                key={index}
              >
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    width: "270px",
                  }}
                >
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    alt={item.original_title}
                    sx={{
                      //   width: "250px",
                      //   height: "375px",
                      borderRadius: "12px",
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%"
                  }}
                >
                  <Box sx={{height: "100%"}}>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 600,
                        letterSpacing: 3,
                        m: "9px 15px",
                      }}
                    >
                      {item.original_title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        letterSpacing: 2,
                        m: "9px 15px",
                        textOverflow: "ellipsis",
                        height: "auto"
                      }}
                    >
                      {item.overview}
                    </Typography>
                    <Tooltip title={item.vote_average} placement="right">
                      <Rating
                        sx={{
                          m: "9px 15px",
                        }}
                        name="customized-10"
                        defaultValue={Number(item.vote_average)}
                        max={10}
                        // readOnly
                        precision={0.1}
                      />
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      bottom: "6px",
                      mx: "9px",
                      width: "90%",
                      justifyContent: "space-between",
                      height: "auto",
                    }}
                  >
                    <Box sx={{ color: "#D86D2E" }}>
                      Release date: {item.release_date}
                    </Box>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => addOrRemoveWatchItem(item)}
                    >
                      <DeleteForeverIcon
                        sx={{
                          color: "#D86D2E",
                          transition: "all 0.3s",
                          "&:active": {
                            transform: "scale(1.7)",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default WatchList;
