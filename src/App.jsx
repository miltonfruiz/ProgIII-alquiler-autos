import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestHome from "./components/TestHome/TestHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/testhome" element={<TestHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
