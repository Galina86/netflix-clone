import React from "react";
import Nav from "./components/Nav";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <div className="app">
      <Nav />
      <AppRouter />
    </div>
  );
};

export default App;
