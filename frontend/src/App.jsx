import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"
import SignupPage from "./pages/SignupPage";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage/>} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage/>} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
