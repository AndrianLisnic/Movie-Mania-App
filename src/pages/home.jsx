import { useEffect, useState } from "react";
import backgroundImage from "../assets/background.png";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home-slice";

const Home = () => {
	const [loading, setLoading] = useState(false);

	const nowPlayingList = useSelector((state) => state.home.playingNowList);

	const dispatch = useDispatch();

	const fetchNowPlayingData = async () => {
		setLoading(true);

		try {
			const res = await fetch(
				"https://api.themoviedb.org/3/movie/now_playing?api_key=1e3d2ab8028e529fc6e3753ff43c9069&language=en-US"
			);
			const data = await res.json();
			dispatch(homeActions.populatePlayingNowList(data.results));

			console.log(data.results);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNowPlayingData();
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
				height: "100vh",
			}}
		>
			<Box
				sx={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					// height: "100vh",
				}}
			>
				<Box>
					<Typography
						sx={{
							fontSize: "36px",
							fontWeight: 700,
							letterSpacing: 3,
							p: "8px 22px",
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
                            gap: 2
						}}
					>
						{!loading &&
							nowPlayingList.map((item, index) => (
								<Box
									component="img"
									src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
									alt={item.original_title}
									key={index}
									sx={{ width: "270px", height: "auto", borderRadius: "12px", mb: "12px" }}
								></Box>
							))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;
