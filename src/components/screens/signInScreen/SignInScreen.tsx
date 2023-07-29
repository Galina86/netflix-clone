import { useRef } from "react";
import "./SignInScreen.css";
import { auth } from "../../../firebase";

const SignInScreen = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
      <div className="signInScreen">
        <form onSubmit={signIn}>
          <h1>Sign in</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default SignInScreen;
