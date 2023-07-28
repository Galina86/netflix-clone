import { useEffect, useRef } from "react";
import "./SignUp.css";
import { auth } from "../../../firebase";

const SignUp = () => {
  const savedEmail = localStorage.getItem("email");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="signUpScreen">
      <form>
        <h1>Create your account</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
