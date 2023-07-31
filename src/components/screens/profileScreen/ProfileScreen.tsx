import Nav from "../../nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router";
import "./ProfileScreen.css";
import { Button } from "@mui/material";
import { ThemeContext } from "../../../App";
import { useContext } from "react";
import { mainPageStyle } from "../../theme/theme";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { themeColor } = useContext(ThemeContext);

  const signOutAndNavigateToLoginScreen = () => {
    auth.signOut();
    navigate("/");
  };

  const themeStyle = {
    ...(themeColor === "light" ? mainPageStyle.light : mainPageStyle.dark),
  };

  return (
    <div style={themeStyle}>
      <div className="profileScreen">
        <Nav />
        <div className="profileScreen__body">
          <h1>Edit Profile</h1>
          <div className="profileScreen__info">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Netflix avatar"
            />
            <div className="profileScreen__details">
              <h2>{user.email}</h2>
              <div className="profileScreen__plans">
                <h2>PLANS</h2>
                <div className="profileScreen__plan">
                  <h3>Premium</h3>
                  <Button
                    variant="contained"
                    color="error"
                    className="profileScreen__plan_button"
                    size="small"
                  >
                    Subscribe
                  </Button>
                </div>
                <div className="profileScreen__plan">
                  <h3>Basic</h3>
                  <Button
                    variant="contained"
                    color="error"
                    className="profileScreen__plan_button"
                    size="small"
                  >
                    Subscribe
                  </Button>
                </div>
                <div className="profileScreen__plan">
                  <h3>Standard</h3>
                  <Button
                    variant="contained"
                    className="profileScreen__plan_buttonCP"
                    size="small"
                  >
                    Current Plan
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => signOutAndNavigateToLoginScreen()}
                  className="profileScreen__signOut"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
