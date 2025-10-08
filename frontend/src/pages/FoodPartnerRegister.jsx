import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";
import "../styles/auth.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Name = e.target.Name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post("http://localhost:3009/api/auth/food-partner/register", {
        Name,
        contactName,
        phone,
        email,
        password,
        address
      }, {
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    navigate("/create-food");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Partner Sign up</h2>
        <p className="auth-sub">Register your kitchen or restaurant.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Business name */}
          <label className="field">
            <span className="label">Business name</span>
            <input type="text" placeholder="Your restaurant or kitchen name" name="Name" />
          </label>

          {/* Contact name */}
          <label className="field">
            <span className="label">Contact name</span>
            <input type="text" placeholder="Contact person name" name="contactName" />
          </label>

          {/* Phone */}
          <label className="field">
            <span className="label">Phone</span>
            <input type="tel" placeholder="+1 555 555 5555" name="phone" />
          </label>

          {/* Contact email */}
          <label className="field">
            <span className="label">Contact email</span>
            <input type="email" placeholder="contact@place.com" name="email" />
          </label>

          {/* Password */}
          <label className="field">
            <span className="label">Password</span>
            <input type="password" placeholder="Choose a password" name="password" />
          </label>

          {/* Address */}
          <label className="field">
            <span className="label">Address</span>
            <textarea placeholder="Street, city, state, postal code" rows={3} name="address" />
          </label>

          <button type="submit" className="btn-primary">Create account</button>

          <div className="auth-foot">
            <Link to="/food-partner/login" className="link">Already registered? Sign in</Link>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: 'var(--muted)', fontSize: 13, marginRight: 8 }}>Or</span>
              <Link to="/user/register" className="link">Register as normal user</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
