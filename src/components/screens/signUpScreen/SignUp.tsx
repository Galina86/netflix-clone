import { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { auth } from "../../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { HOME_PAGE } from "../../../constants";

const SignUp = () => {
  const savedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate()


  useEffect(() => {
    if (savedEmail !== null) {
      setEmail(savedEmail)
    }
  }, [savedEmail]);

  const register =  (e: any) => { 
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
        email, password
      )
      .then((authUser) => {
        console.log(authUser);
        navigate(HOME_PAGE);
      })
      .catch((error) => {
        alert(error.message);
      } );
  };

  const reload = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setIsOpen(false);
    reload();
  };

  return (
    <div className={`signUpScreen ${isOpen ? "active" : "inactive"}`}>
      <div className="signUp__close-icon" onClick={handleClose}>
        <CloseIcon />
      </div>
      <form onSubmit={register}>
        <h2>Create your account</h2>
        <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUp;

