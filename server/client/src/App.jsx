import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./pages/User/Hero/Hero";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SIgnup/Signup";
import Redirect from "./pages/User/Redirect/Redirect";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Admin from "./pages/Admin/AdminLanding/Admin";
import MainTest from "./pages/User/MainTest/MainTest";
import AdminUpload from "./pages/Admin/AdminUpload/AdminUpload";
import ScorePage from "./pages/User/ScorePage/ScorePage";
import ForgetPage from "./pages/User/ForgetPage/ForgetPage";
import ChangePassword from "./pages/User/ChangePassword/ChangePassword";
import UserDisplay from "./pages/Admin/UserDisplay/UserDisplay";
import StaticPage from "./pages/ErrorPage/StaticPage/StaticPage";
import HistoryPage from "./pages/User/HistoryPage/HistoryPage";
import ManageImage from "./pages/Admin/ManageImage/ManageImage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminLanding" element={<Admin />} />
        <Route path="/upload-image" element={<AdminUpload />} />
        <Route path="/mainTest" element={<MainTest />} />
        <Route path="/scorePage" element={<ScorePage />} />
        <Route path="/forgetPage" element={<ForgetPage />} />
        <Route path="/changePassword/:token" element={<ChangePassword />} />
        <Route path="/user-data" element={<UserDisplay />} />
        <Route path="/static-page" element={<StaticPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="manageImage" element={<ManageImage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
