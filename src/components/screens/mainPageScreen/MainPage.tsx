import { useContext } from "react";

import Row from "../../row/Row";
import requests from "../../../requests";
import Banner from "../../banner/Banner";
import { ThemeContext } from "../../../App";
import { IAppTheme } from "../../../appTheme.interface";
import Nav from "../../nav/Nav";
import { mainPageStyle } from "../../theme/theme";

const MainPage = () => {
  const { themeColor } = useContext(ThemeContext);
  //@@@TODO move to handleThemeToggle
  localStorage.setItem("theme", themeColor);

  const themeStyle = {
    ...(themeColor === "light" ? mainPageStyle.light : mainPageStyle.dark),
  };

  const rows = [
    {
      title: "NETFLIX ORIGINALS",
      fetchURL: requests.fetchNetflixOriginals,
      isLargeRow: true,
    },
    { title: "Trending Now", fetchURL: requests.fetchTrending },
    { title: "Top Rated", fetchURL: requests.fetchTopRated },
    { title: "Action Movies", fetchURL: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchURL: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchURL: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchURL: requests.fetchRomanceMovies },
    { title: "Documentaries", fetchURL: requests.fetchDocumentaries },
  ];

  return (
    <div style={themeStyle}>
      <Nav />
      <Banner />
      {rows.map((row, index) => (
        <Row
          key={index}
          title={row.title}
          fetchURL={row.fetchURL}
          isLargeRow={row.isLargeRow}
        />
      ))}
    </div>
  );
};

export default MainPage;
