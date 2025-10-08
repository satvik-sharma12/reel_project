import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import "../styles/theme.css";
import "../styles/auth.css";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import CreateFoodPartner from "../pages/food-partner/CreateFood";
import Profile from '../pages/food-partner/profile';

// Landing component with register links
const Landing = () => {
  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h2 className="auth-title">Get started</h2>
        <p className="auth-sub">Choose how you'd like to join</p>

        <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
          <Link to="/user/register" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
            Register as normal user
          </Link>
          <Link to="/food-partner/register" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
            Register as food partner
          </Link>

          <div style={{ marginTop: 6, fontSize: 13 }}>
            <Link to="/user/login" className="link" style={{ marginRight: 12 }}>User sign in</Link>
            <Link to="/food-partner/login" className="link">Partner sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return(
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/create-food" element={<CreateFoodPartner />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes;