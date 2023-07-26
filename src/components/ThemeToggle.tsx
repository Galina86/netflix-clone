import { useContext } from "react";
import { ThemeContext } from "../App";
import { FormControlLabel, FormGroup, Switch} from "@mui/material";

const ThemeToggle = () => {
  const { themeColor, setThemeColor } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setThemeColor(themeColor === "light" ? "dark" : "light");
  console.log("hello")
  };

  return (
    <div>
       <FormGroup>
          <FormControlLabel control={<Switch checked={themeColor === "dark"} onChange={handleThemeToggle} color='default'/>} label="" />
       </FormGroup>
    </div>
  );
};

export default ThemeToggle;
