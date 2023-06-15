import React from "react";
import "./App.css";
import Row from "./components/Row";
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <h1>Netflix Clone</h1>
      <Row
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginlas}
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
    </div>
  );
}

export default App;
