import { useState } from "react";
import "./SignInScreen.css";
import { auth } from "../../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { HOME_PAGE } from "../../../constants";
import { useNavigate } from "react-router";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const navigate = useNavigate();

  const reload = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setIsOpen(false);
    reload();
  };

  const signIn = (e: any) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        navigate(HOME_PAGE);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className={`signInScreen ${isOpen ? "active" : "inactive"}`}>
        <form onSubmit={signIn}>
          <div className="signIn__close-icon" onClick={handleClose}>
            <CloseIcon />
          </div>
          <h2>Please enter your email and password</h2>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">SIGN IN</button>
        </form>
      </div>
    </>
  );
};

export default SignInScreen;
