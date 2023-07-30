import axios from "../../axios";
import { useEffect, useState } from "react";
import requests from "../../requests";
import "./Banner.css";
import { IBanner } from "./banner.interface";
import PlayTrailer from "../PlayTrailer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Banner() {
  const [movie, setMovie] = useState<IBanner>();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str: string, max: number) {
    return str.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}")`,
      }}
    >
      {!movie ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <PlayTrailer result={movie} />
          <h1 className="banner__description">
            {truncate(`${movie?.overview}`, 150)}
          </h1>
        </div>
      )}
      <div className="banner--fadeBottom"></div>
    </div>
  );
}

export default Banner;
