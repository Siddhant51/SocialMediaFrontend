import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const BASE_URI = "http://localhost:3000";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, profilePic } = user;

    if (name && email && password) {
      axios.post(`${BASE_URI}/register`, user).then(() => {
        console.log("Registered successfully");
        navigate("/login");
      });
    }
  };

  return (
    <div className="register">
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      ></input>
      <div className="registerbtn" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="btn" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
