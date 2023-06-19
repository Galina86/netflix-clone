import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css"

const img_base_URL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchURL, isLargeRow }: { title: string; fetchURL: string; isLargeRow?: boolean}) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className ="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${img_base_URL}${isLargeRow  ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
