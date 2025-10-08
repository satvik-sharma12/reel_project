import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";
import "../styles/auth.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const UserRegister = () => {
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value; 
        const response=axios.post("http://localhost:3009/api/auth/user/register",{
            fullName: firstName + " " + lastName,
            email: email,
            password: password
        },{
          withCredentials: true
        })
        navigate("/");
    }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        <p className="auth-sub">Sign up as a user to discover delicious food.</p>

        <form className="auth-form" onSubmit={handleSubmit} /* no submit logic included */>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label className="field" style={{ margin: 0 }}>
              <span className="label">First name</span>
              <input type="text" placeholder="Jane" name="firstName"/>
            </label>

            <label className="field" style={{ margin: 0 }}>
              <span className="label">Last name</span>
              <input type="text" placeholder="Doe" name="lastName"/>
            </label>
          </div>

          <label className="field">
            <span className="label">Email</span>
            <input type="email" placeholder="you@example.com" name="email"/>
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input type="password" placeholder="Enter password" name="password"/>
          </label>

          <button type="submit" className="btn-primary">Create account</button>

          <div className="auth-foot">
            <Link to="/user/login" className="link">Already have an account? Sign in</Link>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: 'var(--muted)', fontSize: 13, marginRight: 8 }}>Or</span>
              <Link to="/food-partner/register" className="link">Register as food partner</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
