import { Route, Routes } from "react-router";
import MainPage from "../components/MainPage";
import MoviePage from "./MoviePage";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { useEffect } from "react";
import { auth } from "../firebase";

const AppRouter = () => {

  const user = null;
  

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
         console.log("@@@", userAuth)
      } else{

      }
    });

    return unsubscribe;
  },[])
     
  return (

    <Routes>
      {!user ? <Route path="/" element={<LoginScreen />} /> :
        (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="movie">
              <Route path=":id" element={<MoviePage />}></Route>
            </Route>
          </>)}


    </Routes>

  );
};

export default AppRouter;
