import { Route, Routes } from "react-router";
import MainPage from "./screens/mainPageScreen/MainPage";
import MoviePage from "./screens/moviePageScreen/MoviePage";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../redux/userSlice";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import { HOME_PAGE, PROFILE_PAGE, MOVIE_PAGE} from '../constants';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AppRouter = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const userInLocalStorage = localStorage.getItem("email");

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

  // if (userInLocalStorage === "") {
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

  console.log("user", !!userInLocalStorage);

  return (
    <Routes>
      {!user ? (
        <Route path={HOME_PAGE} element={<LoginScreen />} />
      ) : (
        <>
          <Route path={PROFILE_PAGE} element={<ProfileScreen />} />
          <Route path={HOME_PAGE} element={<MainPage />} />
          <Route path={MOVIE_PAGE}>
            <Route path=":id" element={<MoviePage />}></Route>
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
