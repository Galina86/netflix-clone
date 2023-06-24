import React, { useContext } from "react";
import "../App.css";

import Row from "./Row";
import requests from "../requests";
import Banner from "../components/Banner";
import { ThemeContext } from "../App";
import { IAppTheme } from "../appTheme.interface";


const MainPage = () => {

  const { theme } = useContext(ThemeContext);

  const mainPageStyle: IAppTheme = {
    dark: {
      backgroundColor: '#111',
      color: 'white'
    },
    light: {
      backgroundColor: 'white',
      color: 'black'
    }
  }

  const themeStyle = {
    ...(theme === 'light' ? mainPageStyle.light : mainPageStyle.dark)
  }


  return (
    <div style={themeStyle}>
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
