import { useContext, useEffect, useState } from "react";
import "./MoviePage.css";
import { IMAGE_BASE_URL } from "../../../constants";
import { ThemeContext } from "../../../App";
import Nav from "../../nav/Nav";
import PlayTrailer from "../../play-trailer/PlayTrailer";
import axios from "axios";
import { mainPageStyle } from "../../theme/theme";

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
    //removed dependencies to fix endless call to server
  }, []);

  if (!result) {
    return null;
  }

  return (
    <div style={themeStyle}>
      <div className="movie">
        <Nav />
        <div className="movie__body">
          {result.success === false || !result.poster_path ? (
            <p className="movie__error-message">
              Ooops, sorry, we couldn't find this movie in our database
            </p>
          ) : (
            <div>
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
                  <p className="movie__genre">
                    Genre:{" "}
                    {result.genres.map((genre: any) => genre.name).join(", ")}
                  </p>
                  <PlayTrailer result={result} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
