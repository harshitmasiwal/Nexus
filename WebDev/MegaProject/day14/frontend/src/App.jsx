import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticated, loading , error } = useSelector((state) => state.auth);


  useEffect(() => {
    console.log(error)
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Homepage></Homepage>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/"></Navigate> : <Login></Login>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/"></Navigate> : <Signup></Signup>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
