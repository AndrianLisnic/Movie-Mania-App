import appLogo from "../assets/logo_transparent_bg.png";
import { Box, Typography, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import { FavoriteBorderOutlined as Favorite } from "@mui/icons-material";
import { useState } from "react";

const NavBar = () => {
  const [inputNameValue, setInputNameValue] = useState("");

  const handleNameSearch = (event) => {
    setInputNameValue(event.target.value);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: {
          xs: "wrap",
          sm: "wrap",
          md: "nowrap",
          lg: "nowrap",
        },
        justifyContent: {
          xs: "center",
          sm: "center",
          md: "space-between",
          lg: "space-between",
        },
        backgroundColor: "black",
      }}
    >
      <Box
        component="img"
        src={appLogo}
        alt="MovieMania Logo"
        sx={{
          width: {
            xs: 100,
            sm: 150,
            md: 200,
            lg: 250,
          },
          height: "auto",
          p: {
            xs: "8px",
            sm: "12px",
            md: "12px",
            lg: "12px",
          },
          transition: "all 0.3s ease",
          "&:hover": {
            filter: "drop-shadow(0 0 2em #646cffaa)",
          },
          cursor: "pointer",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <Box
          component="form"
          sx={{
            width: "auto",
            p: "6px",
            display: "flex",
          }}
        >
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <Input
              placeholder="Search your favorite movie..."
              type="text"
              value={inputNameValue}
              onChange={handleNameSearch}
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "18px",
                  md: "26px",
                  lg: "26px",
                },
                color: "white",
                borderColor: "#D86D2E",
                ":after": { borderBottomColor: "#D86D2E" },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box
          variant="text"
          sx={{
            p: "6px",
            m: {
              xs: "3px 12px",
              sm: "4px 12px",
              md: "8px 12px",
              lg: "8px 12px",
            },
            display: "flex",
            // justifyContent: "start",
            gap: 1,
            maxWidth: "130px",
            cursor: "pointer",
          }}
        >
          <Favorite sx={{ color: "#D86D2E" }} />
          <Typography
            sx={{ color: "white", fontSize: "18px", textWrap: "nowrap" }}
            textTransform={"none"}
          >
            Watch list
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
