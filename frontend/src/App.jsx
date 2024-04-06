import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import SendMoney from "../pages/SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
