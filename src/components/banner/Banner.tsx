import axios from "../../axios";
import { useEffect, useState } from "react";
import requests from "../../requests";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import { Button } from "@mui/material";
import closeIcon from "../../assets/images/close_white.png";
import { IBanner } from "./banner.interface";
import CircularProgress from "@mui/material/CircularProgress";

function Banner() {
  const [movie, setMovie] = useState<IBanner>();
  const [trailerURL, setTrailerURL] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  let result: any;

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
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      {movie ? (
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <Button
            variant="contained"
            color="error"
            className="banner__button"
            onClick={() => {
              handleOpen();
              handleClick(result);
            }}
          >
            Play
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box className="banner__trailer-window">
              <img
                src={closeIcon}
                alt="close icon"
                onClick={handleClose}
                className="banner__trailer-close-icon"
              />
              {trailerURL ? (
                <YouTube videoId={trailerURL} opts={options} />
              ) : (
                <p className="banner__trailer-error">
                  We are sorry, there is no trailer for this movie.
                </p>
              )}
            </Box>
          </Modal>
          <h1 className="banner__description">
            {truncate(`${movie?.overview}`, 150)}
          </h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "60px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
