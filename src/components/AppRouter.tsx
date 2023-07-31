import { Route, Routes } from "react-router";
import MainPage from "./screens/mainPageScreen/MainPage";
import MoviePage from "./screens/moviePageScreen/MoviePage";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../redux/userSlice";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";

const AppRouter = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Login in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // if (!user) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "black",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Routes>
      {!user ? (
        <Route path="/" element={<LoginScreen />} />
      ) : (
        <>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/" element={<MainPage />} />
          <Route path="movie">
            <Route path=":id" element={<MoviePage />}></Route>
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
