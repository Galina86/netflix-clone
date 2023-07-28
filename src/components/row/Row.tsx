import { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../constants";
import { IRow } from "./row.interface";

const Row = (props: IRow) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchURL]);

  let navigate = useNavigate();
  const handleClick = (movie: { id: number }) => {
    let path = `/movie/${movie.id}`;
    navigate(path);
  };

  return (
    <div className="row">
      {movies.length !== 0 && (
        <>
          <h2>{props.title}</h2>
          <div className="row_posters">
            {movies.map((movie) => (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${
                  props.isLargeRow && "row_posterLarge"
                }`}
                src={`${IMAGE_BASE_URL}${
                  props.isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Row;
