import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DummyScreen from "./pages/DummyScreen";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import AddingExpenses from "./pages/AddingExpenses";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dummy" element={<DummyScreen />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/addingExpenses" element={<AddingExpenses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
