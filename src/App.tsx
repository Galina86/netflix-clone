import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import AppRouter from "./components/AppRouter";
import { IThemeContext } from "./appTheme.interface";

export const ThemeContext = React.createContext({} as IThemeContext);

const App = () => {

  //@@@TODO: think about better place for this logic 
  const isLocalStorage = localStorage.getItem('theme') !== null;
  const themeFromLocalStorage = localStorage.getItem('theme');
  const [theme, setTheme] = useState(isLocalStorage ? themeFromLocalStorage : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>
        <Nav />
        <AppRouter />
      </div>
    </ThemeContext.Provider>

  );
};

export default App;
