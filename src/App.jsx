import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestHome from "./components/TestHome/TestHome";
import PasswordRecover from "./pages/PasswordRecover";
import ProtectedRouteUser from "./components/ProtectedRouteUser/ProtectedRouteUser";
import { useState } from "react";
import RegisterForm from "./components/Register/RegisterForm";
import Register from "./pages/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLogged={setLoggedIn} />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/testhome"
          element={
            <ProtectedRouteUser isSigned={loggedIn}>
              <TestHome />
            </ProtectedRouteUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
