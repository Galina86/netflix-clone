import { useContext } from "react";

import Row from "../../row/Row";
import requests from "../../../requests";
import Banner from "../../banner/Banner";
import { ThemeContext } from "../../../App";
import { IAppTheme } from "../../../appTheme.interface";
import Nav from "../../nav/Nav";

const MainPage = () => {
  const { themeColor } = useContext(ThemeContext);
  //@@@TODO move to handleThemeToggle
  localStorage.setItem("theme", themeColor);

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

  return (
    <div style={themeStyle}>
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
};

export default MainPage;