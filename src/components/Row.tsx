import React, { useState, useEffect } from "react";
import axios from "../axios";

const img_base_URL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchURL }: { title: string; fetchURL: string }) => {
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
    <>
      <h2>{title}</h2>

      <div>
        {movies.map((movie) => (
          <img
            src={`${img_base_URL}${movie.backdrop_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </>
  );
};

export default Row;
