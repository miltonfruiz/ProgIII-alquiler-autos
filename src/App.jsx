import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestHome from "./components/TestHome/TestHome";
import PasswordRecover from "./pages/PasswordRecover";
import ProtectedRouteUser from "./components/ProtectedRouteUser/ProtectedRouteUser";
import UserProfile from "./pages/UserProfile";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLogged={setLoggedIn} />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
        <Route
          path="/testhome"
          element={
            <ProtectedRouteUser isSigned={loggedIn}>
              <TestHome />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRouteUser isSigned={loggedIn}>
              <UserProfile />
            </ProtectedRouteUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
