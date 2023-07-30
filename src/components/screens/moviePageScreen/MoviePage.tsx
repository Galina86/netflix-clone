import { useContext, useEffect, useState } from "react";
import "./MoviePage.css";
import { IMAGE_BASE_URL } from "../../../constants";
import { IAppTheme } from "../../../appTheme.interface";
import { ThemeContext } from "../../../App";
import Nav from "../../nav/Nav";
import PlayTrailer from "../../PlayTrailer";
import axios from "axios";

const MoviePage = () => {
  const url = window.location.pathname;
  const movie_id = url.substring(url.lastIndexOf("/") + 1);
  const { themeColor } = useContext(ThemeContext);
  const [result, setResult] = useState<any>();

  const tmdbToken = process.env.REACT_APP_TMDB_TOKEN;

  const tokens = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbToken}`,
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
    async function fetchMovies() {
      const movieResult = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
        tokens
      );
      setResult(movieResult.data);
    }
    fetchMovies();
    //removed dependencies to fix endless call to server
  }, []);

  if (!result) {
    return null;
  }

  return (
    <div style={themeStyle}>
      <Nav />
      {result.success === false ? (
        <p className="movie__error-message">{result.status_message}</p>
      ) : (
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
              <PlayTrailer result={result} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
