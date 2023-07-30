import { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { auth } from "../../../firebase";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const savedEmail = localStorage.getItem("email");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (savedEmail !== null) {
      emailRef.current!.value = savedEmail;
    }
  }, [savedEmail]);

  const register = (e: any) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
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

  const reload = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setIsOpen(false);
    reload();
  };

  return (
    <div className={`signUpScreen ${isOpen ? "active" : "inactive"}`}>
      <div className='signUp__close-icon' onClick={handleClose}>
        <CloseIcon />
      </div>
      <form onSubmit={register}>
        <h2>Create your account</h2>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUp;
