import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginbox.css"; // import the CSS file
import ucfLogo from '../../Images/ucf_logo.PNG';
import {userType} from "../Register/RegisterBox";



const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleError = (event) => {
    setError(event.target.value);
  }

  const handleLogin = () => {
    const userType = window.sessionStorage.getItem("userType");
    if(userType === "student"){
      navigate("/StudentBox");
    }
    else if (userType === "admin"){
      navigate("/AdminBox");
    }
    else {
      setError("Invalid Log In");
    }

  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div class="container">
  <div class="row">
    <div class="column">
      <div class="logo">
        <img src={ucfLogo} alt="Logo" />
      </div>
    </div>
    <div class="column">
      <div class="login-box">
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button onClick={handleLogin}>Submit</button>
        {error &&<div>Error:{error}</div>}
        <br />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginBox;
