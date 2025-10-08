import React from "react";
import "../styles/theme.css";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3009/api/auth/food-partner/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      console.log(response.data);
       navigate("/create-food");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Partner Sign in</h2>
        <p className="auth-sub">Access your partner dashboard.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">Email</span>
            <input type="email" placeholder="partner@example.com" name="email" />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input type="password" placeholder="Enter password" name="password" />
          </label>

          <button type="submit" className="btn-primary">Sign in</button>

          <div className="auth-foot">
            <a href="/food-partner/register" className="link">New partner? Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
