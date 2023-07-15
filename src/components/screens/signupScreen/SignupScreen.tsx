import React, {useRef } from 'react';
import './SignupScreen.css'
import { auth } from '../../../firebase';

const SignupScreen = () => {

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const register =(e:any)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current!.value, 
            passwordRef.current!.value
            )
            .then((authUser)=>{
                console.log(authUser)
            })
            .catch((error) =>{
                alert(error.message);
            });
    }

    const signIn = (e:any) =>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current!.value, 
            passwordRef.current!.value
        )
        .then((authUser)=>{
            console.log(authUser)
        })
        .catch((error) =>{
            alert(error.message);
        });
    }


  return (
 
      <div className="signupScreen">
         <form>
            <h1>Sign in</h1>
           <input  ref={emailRef} type='email' placeholder='Email' />  
           <input ref={passwordRef} type='password' placeholder='Password' /> 
           <button type="submit" onClick={signIn}>Sign in</button>
           <h4>
            <span className="signupScreen_grey">New to Neflix? </span> 
            <span className="signupScreen_link" onClick={register}>Sign up now.</span>
            </h4>
          </form>
      </div>

  )
}

export default SignupScreen;
