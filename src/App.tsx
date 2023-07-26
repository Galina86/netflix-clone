import React, { useState } from "react";
import AppRouter from "./components/AppRouter";
import { IThemeContext } from "./appTheme.interface";

export const ThemeContext = React.createContext({} as IThemeContext);

const App = () => {
  //@@@TODO: think about better place for this logic
  const isLocalStorage = localStorage.getItem("theme") !== null;
  const themeFromLocalStorage = localStorage.getItem("theme");
  const [themeColor, setThemeColor] = useState(
    isLocalStorage ? themeFromLocalStorage : "light"
  );

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      <div>
        <AppRouter />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
