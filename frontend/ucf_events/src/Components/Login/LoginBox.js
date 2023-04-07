import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginbox.css"; // import the CSS file
import ucfLogo from '../../Images/ucf_logo.PNG'

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {

    navigate("/Home");
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
        <br />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginBox;
