import { useRef, useState } from "react";
import "./LoginScreen.css";
import SignInScreen from "../signInScreen/SignInScreen";
import SignUp from "../signUpScreen/SignUp";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const signUpAndSetLocalStorage = () => {
    setSignUp(true);
    localStorage.setItem("email", emailRef.current!.value);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          alt="Netflix logo"
          onClick={reload}
        />
      </div>
      <button onClick={() => setSignIn(true)} className="loginScreen__button">
        Sign In
      </button>
      <div className="loginScreen__gradient"></div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignInScreen />
        ) : signUp ? (
          <SignUp />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more</h1>
            <h2> Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen__input">
              <form
                onSubmit={() => {
                  signUpAndSetLocalStorage();
                }}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  ref={emailRef}
                />
                <button className="loginScreen_getStarted">Get started</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
