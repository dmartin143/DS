import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginbox.css"; // import the CSS file
import ucfLogo from '../../Images/ucf_logo.PNG';
import { headers, route } from '../../requestUtils.js'



const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {}, [username, password]);

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
    const user = {
      username,
      password
    };

    let options = {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(user)
    }
    fetch(route + '/login', options)
    .then((response) => {
      if (response.status === 409) {
        setError('Incorrect username or password');
      } else if (response.status === 200){
        //if (userType === "student") {
          navigate("/Student");
          console.log('navigating to student page');
        // } else if (userType === "Admin") {
        //   navigate("/Admin");
        //   console.log('navigating to student page');
        // }
      } else {
        response.json().then((response) => {
          setError(response.message);
        })
      }
    })
    .catch(error => {
      setError('An issue occured when logging in');
      console.log('handleLogin error:', error);

    });
    console.log('handleLogin called');
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="container">
  <div className="row">
    <div className="column">
      <div className="logo">
        <img src={ucfLogo} alt="Logo" />
      </div>
    </div>
    <div className="column">
      <div className="login-box">
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
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
