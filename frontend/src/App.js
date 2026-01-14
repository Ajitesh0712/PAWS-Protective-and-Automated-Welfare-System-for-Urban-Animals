import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MissingPets from "./pages/MissingPets";
import Partners from "./pages/Partners";
import About from "./pages/About";
import NGODashboard from "./pages/NGODashboard";
import UserSettings from "./pages/UserSettings";
import NGOSettings from "./pages/NGOSettings";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/missing" element={<MissingPets />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/about" element={<About />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/settings/user" element={<UserSettings />} />
        <Route path="/settings/ngo" element={<NGOSettings />} />
      </Routes>
    </BrowserRouter>
  );
}
