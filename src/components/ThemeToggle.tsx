import { useContext } from "react";
import { ThemeContext } from "../App";
import { FormControlLabel, FormGroup, Switch, styled} from "@mui/material";
import MaterialUISwitch from "./materialUISwitch/MaterialUISwich";

const ThemeToggle = () => {
  const { themeColor, setThemeColor } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setThemeColor(themeColor === "light" ? "dark" : "light");
  };  

  return (
    <div>
       <FormGroup>
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={themeColor === "dark"} onChange={handleThemeToggle} color='default'/>} label="" />
       </FormGroup>
    </div>
  );
};

export default ThemeToggle;
