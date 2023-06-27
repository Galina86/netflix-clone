import { useEffect, useState } from "react";
import "./MoviePage.css";
import { IMAGE_BASE_URL } from "../constants";

const MoviePage = () => {
  const url = window.location.pathname;
  const movie_id = url.substring(url.lastIndexOf("/") + 1);

  const [result, setResult] = useState<any>();

  const tokens = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQ0MmU0MGEzMmJkNzM2YzgwZTVjMWU1YjMyYTk2ZiIsInN1YiI6IjY0ODIzYzhhOGMwYTQ4MDEzY2M3OTcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rvNpahI0z9c9Z8uuKRpG0MMyzhAawZadYGCZOtqZtqE",
    },
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
  }, []);

  if (!result) {
    return null;
  }

  return (
    <div className="movie">
      <h2 className="movie__title">{result["title"]}</h2>
      <div className="movie__details">
        <img
          className="movie__poster"
          src={`${IMAGE_BASE_URL}${result.poster_path}`}
          alt={result.title}
        />
        <p className="movie__description">{result.overview}</p>
      </div>
    </div>
  );
};

export default MoviePage;
