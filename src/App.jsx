import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestHome from "./components/TestHome/TestHome";
import PasswordRecover from "./pages/PasswordRecover";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/testhome" element={<TestHome />} />
        <Route path="/password-recover" element={<PasswordRecover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
