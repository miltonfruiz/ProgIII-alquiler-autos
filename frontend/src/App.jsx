import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Log/Login/Login";
import PasswordRecover from "./pages/Log/PasswordRecover/PasswordRecover";
import ProtectedRouteUser from "./components/ProtectedRouteUser/ProtectedRouteUser";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import ProtectedRoutesRegister from "./components/ProtectedRoutesRegister/ProtectedRoutesRegister";
import CarPaymentPage from "./pages/CarPaymentPage";
import Cars from "./pages/Cars";

//Sosa
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Modal from "./components/Modal/Modal";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Landing from "./pages/Landing";
import Administration from "./pages/Administration";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin/ProtectedRouteAdmin";
import ResetPassword from "./pages/Log/PasswordReset/PasswordReset";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login setLogged={setLoggedIn} />} />
        <Route path="/login" element={<Login setLogged={setLoggedIn} />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/register"
          element={<Register setRegisterIn={setRegisterIn}></Register>}
        ></Route>
        <Route path="/home" element={<Home loggedIn={loggedIn} />} />
        <Route
          path="/carPayment"
          element={<CarPaymentPage></CarPaymentPage>}
        ></Route>

        <Route
          path="/user-profile"
          element={
            // <ProtectedRouteUser isSigned={loggedIn}>
            <UserProfile />
            // </ProtectedRouteUser>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/landing" element={<Landing></Landing>} />
        <Route
          path="/administration"
          element={
            <ProtectedRouteAdmin>
              {" "}
              <Administration />{" "}
            </ProtectedRouteAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
