import Nav from "../../nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const signOutAndNavigateToLoginScreen = () => {
    auth.signOut();
    navigate("/");
  };

  return (
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
              <h3>Plans</h3>
              <div className="profileScreen__plan">
                <h5>Premium</h5>
                <button className="profileScreen__plan_button">
                  Subscribe
                </button>
              </div>
              <div className="profileScreen__plan">
                <h5>Basic</h5>
                <button className="profileScreen__plan_button">
                  Subscribe
                </button>
              </div>
              <div className="profileScreen__plan">
                <h5>Standart</h5>
                <button className="profileScreen__plan_buttonCP">
                  Current Plan
                </button>
              </div>
              <button
                onClick={() => signOutAndNavigateToLoginScreen()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
