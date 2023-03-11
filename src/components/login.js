import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const BASE_URI = "http://localhost:3000";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const { email, password } = user;

    if (email && password) {
      axios.post(`${BASE_URI}/login`, user).then((res) => {
        if (res) {
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          setLoginUser(res.data.user);
          console.log("Logged-in successfully");
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      });
    } else {
      alert("Please enter the fields");
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      ></input>
      <div className="loginbtn" onClick={login}>
        Login
      </div>
      <div> or </div>
      <div className="btn" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
