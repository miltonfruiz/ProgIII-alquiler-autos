import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestHome from "./components/TestHome/TestHome";
import PasswordRecover from "./pages/PasswordRecover";
import ProtectedRouteUser from "./components/ProtectedRouteUser/ProtectedRouteUser";
import UserProfile from "./pages/UserProfile";
import { useState } from "react";
import RegisterForm from "./components/Register/RegisterForm";
import Register from "./pages/Register";
import ProtectedRoutesRegister from "./components/ProtectedRoutesRegister/ProtectedRoutesRegister";
import CarPayment from "./components/CarPayment/CarPayment";
import Cars from "./pages/Cars";
import Landing from "./pages/Landing";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLogged={setLoggedIn} />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
        <Route
          path="/register"
          element={<Register setRegisterIn={setRegisterIn}></Register>}
        ></Route>
        <Route
          path="/testhome"
          element={
            <ProtectedRouteUser isSigned={loggedIn}>
              <TestHome />
            </ProtectedRouteUser>
          }
        />
        <Route path="/carPayment" element={<CarPayment></CarPayment>}></Route>
        <Route
          path="/user-profile"
          element={
            <ProtectedRouteUser isSigned={loggedIn}>
              <UserProfile />
            </ProtectedRouteUser>
          }
        />
        <Route path="/cars" element={<Cars></Cars>} />
        <Route path="/presentation" element={<Landing></Landing>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
