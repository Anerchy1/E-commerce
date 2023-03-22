import { Routes, Route } from "react-router-dom";
import "./styles/bootstrap.min.css";
import SignUp from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
