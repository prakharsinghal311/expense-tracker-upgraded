import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DummyScreen from "./pages/DummyScreen";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dummy" element={<DummyScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
