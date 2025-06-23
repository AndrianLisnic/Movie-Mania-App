import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/nav-bar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import WatchList from "./pages/watch-list";

function App() {
  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        <Route
          path="/watch-list"
          element={
            <>
              <NavBar />
              <WatchList />
            </>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
