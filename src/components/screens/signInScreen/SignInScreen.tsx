import { useRef, useState } from "react";
import "./SignInScreen.css";
import { auth } from "../../../firebase";
import CloseIcon from "@mui/icons-material/Close";

const SignInScreen = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(true);

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
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then((authUser) => {
        console.log(authUser);
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
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit">SIGN IN</button>
        </form>
      </div>
    </>
  );
};

export default SignInScreen;
