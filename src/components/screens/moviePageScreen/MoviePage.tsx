import { useContext, useEffect, useState } from "react";
import "./MoviePage.css";
import { IMAGE_BASE_URL } from "../../../constants";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { IAppTheme } from "../../../appTheme.interface";
import { ThemeContext } from "../../../App";
import Nav from "../../nav/Nav";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import closeIcon from '../../../assets/images/close_icon.png'
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 390,
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MoviePage = () => {
  const url = window.location.pathname;
  const movie_id = url.substring(url.lastIndexOf("/") + 1);
  const { themeColor } = useContext(ThemeContext);
  const [result, setResult] = useState<any>();
  const [trailerURL, setTrailerURL] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tokens = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQ0MmU0MGEzMmJkNzM2YzgwZTVjMWU1YjMyYTk2ZiIsInN1YiI6IjY0ODIzYzhhOGMwYTQ4MDEzY2M3OTcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rvNpahI0z9c9Z8uuKRpG0MMyzhAawZadYGCZOtqZtqE",
    },
  };

  const mainPageStyle: IAppTheme = {
    dark: {
      backgroundColor: "#111",
      color: "white",
    },
    light: {
      backgroundColor: "white",
      color: "black",
    },
  };

  const themeStyle = {
    ...(themeColor === "light" ? mainPageStyle.light : mainPageStyle.dark),
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movieResult = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
        tokens
      );
      const json = await movieResult.json();
      setResult(json);
    };
    fetchMovies();
  }, [movie_id, tokens]);

  if (!result) {
    return null;
  }

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

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

  return (
    <div style={themeStyle}>
      <Nav />
      <div className="movie">
        <h2 className="movie__title">{result["title"]}</h2>
        <div className="movie__details">
          <img
            className="movie__poster"
            src={`${IMAGE_BASE_URL}${result.poster_path}`}
            alt={result.title}
          />
          <div className="movie__wrapper">
            <p className="movie__description">{result.overview}</p>
            <p className="movie__rating">
              Average rating: {result.vote_average}
            </p>
            {result.genres && (
              <p className="movie__genre">
                Genre:{" "}
                {result.genres.map((genre: any) => genre.name).join(", ")}
              </p>
            )}
            <Button
               variant="contained" color="error"
               onClick={() => {
                handleOpen();
                handleClick(result);
              }}
            >
              Play Trailer
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box sx={style} >
              <img src={closeIcon} alt="here image" onClick={handleClose} className='movie__trailer-close-icon' />
                {trailerURL ? (
                  <YouTube videoId={trailerURL} opts={options} />
                ) : (
                  <p className='movie__trailer-error'>We are sorry, there is no trailer for this movie.</p>
                )}
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
