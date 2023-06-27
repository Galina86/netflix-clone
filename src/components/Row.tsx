import { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants";

const Row = ({
  title,
  fetchURL,
  isLargeRow,
}: {
  title: string;
  fetchURL: string;
  isLargeRow?: boolean;
}) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  let navigate = useNavigate();
  const handleClick = (movie: { id: number }) => {
    let path = `/movie/${movie.id}`;
    navigate(path);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${IMAGE_BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
