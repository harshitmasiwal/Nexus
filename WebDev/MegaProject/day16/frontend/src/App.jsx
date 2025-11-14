import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Adminpanel from "./pages/Adminpanel";
import CreateProblem from "./pages/CreateProblem";
import UpdateProblem from "./pages/UpdateProblem";
import DeleteProblem from "./pages/DeleteProblem";

function App() {
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="bg-black min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

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
        <Route
          path="/admin"
          element={
            isAuthenticated && user.role === "admin" ? (
              <Adminpanel></Adminpanel>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/admin/create-problem"
          element={
            isAuthenticated && user.role === "admin" ? (
              <CreateProblem></CreateProblem>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/admin/update-problem"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UpdateProblem></UpdateProblem>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/admin/delete-problem"
          element={
            isAuthenticated && user.role === "admin" ? (
              <DeleteProblem></DeleteProblem>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
