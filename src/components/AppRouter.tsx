import { Route, Routes } from "react-router";
import MainPage from "../components/MainPage";
import MoviePage from "./MoviePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="movie">
        <Route path=":id" element={<MoviePage />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
