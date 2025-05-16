import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/nav-bar";
import Home from "./pages/home";

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
			<NavBar />
			<Home />
		</Box>
	);
}

export default App;

// sx={{
// 	width: "80%",
// 	height: "100vh", // Full viewport height for vertical centering
// 	display: "flex", // Use flexbox
// 	flexDirection: "column", // Stack elements vertically
// 	justifyContent: "center", // Center horizontally
// 	alignItems: "center", // Center vertically
// 	margin: "0 auto", // Optionally centers Box horizontally in the viewport
//   }}
