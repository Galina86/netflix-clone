import axios from "../axios";
import { useEffect, useState } from "react";
import requests from "../requests";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import closeIcon from '../assets/images/close_white.png'

type Movie = {
  backdrop_path: string;
  name?: string;
  original_name?: string;
  title?: string;
  poster_path: string;
  overview?: string;
};

function Banner() {
  const [movie, setMovie] = useState<Movie>();
  const [result, setResult] = useState<any>();
  const [trailerURL, setTrailerURL] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log("movie", movie)

  function truncate(str: string, max: number) {
    return str.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  const handleClick = (result: any) => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(result?.title || "")
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error: any) => console.log(error));
    }
  };

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => {
                handleOpen();
                handleClick(result);
              }} >Play</button>

          <Modal
              open={open}
              onClose={handleClose}
            >
              <Box className="banner__trailer-window" >
              <img src={closeIcon} alt="here image" onClick={handleClose} className="banner__trailer-close-icon"/> 
                {trailerURL ? (
                  <YouTube videoId={trailerURL} opts={options} />
                ) : (
                  <p className="banner__trailer-error">We are sorry, there is no trailer for this movie.</p>
                )}
              </Box>
            </Modal>
        </div>
        <h1 className="banner__description">
          {truncate(`${movie?.overview}`, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
