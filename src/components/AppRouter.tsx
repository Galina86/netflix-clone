import { Route, Routes } from "react-router";
import MainPage from "../components/MainPage";
import MoviePage from "./MoviePage";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";

const AppRouter = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
         dispatch(login({
          uid: userAuth.uid,
          email : userAuth.email,
         }))
      } else{
        dispatch(logout)
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
