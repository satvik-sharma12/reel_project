import React from "react";
import "../styles/theme.css";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3009/api/auth/user/login", {
      email,
      password
    }, { withCredentials: true });

    console.log(response.data);

    navigate("/home"); // Redirect to home after login

  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">Email</span>
            <input type="email" placeholder="you@example.com" name="email" />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input type="password" placeholder="Enter password" name="password" />
          </label>

          <button type="submit" className="btn-primary">Sign in</button>

          <div className="auth-foot">
            <a href="/user/register" className="link">Don't have an account? Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
