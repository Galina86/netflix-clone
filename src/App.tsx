import React, { useState } from "react";
import Nav from "./components/Nav";
import AppRouter from "./components/AppRouter";
import { IThemeContext } from "./appTheme.interface";


export const ThemeContext = React.createContext({} as IThemeContext);

const App = () => {

  const [theme, setTheme] = useState('light')

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
