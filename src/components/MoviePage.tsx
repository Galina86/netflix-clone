import { useEffect, useState } from "react";
import "./MoviePage.css";
import { IMAGE_BASE_URL } from "../constants";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const MoviePage = () => {
  const url = window.location.pathname;
  const movie_id = url.substring(url.lastIndexOf("/") + 1);

  const [result, setResult] = useState<any>();
  const [trailerURL, setTrailerURL] = useState<string | null>(null);

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
    <div className="movie">
      <h2 className="movie__title">{result["title"]}</h2>
      <div className="movie__details">
        <img
          className="movie__poster"
          src={`${IMAGE_BASE_URL}${result.poster_path}`}
          alt={result.title}
          onClick={() => handleClick(result)}
        />
        <p className="movie__description">{result.overview}</p>
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={options} />}
    </div>
  );
};

export default MoviePage;
