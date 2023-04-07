import React, { useState } from "react";
import "./registerbox.css";
import { useNavigate } from "react-router-dom";

import ucfLogo from '../../Images/ucf_logo.PNG'

const RegisterBox = ({ handleRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = () => {
    navigate("/UserType");
  };

  return (
    <div className="container">
      <div class="row">
        <div class="column">
          <div className="register-page-logo">
            <img src={ucfLogo} alt="Logo" />
          </div>
        </div>
      <div class="column">
        <div className="register-page-form">
          <div className="register-page-form-header">
            <h2>Register</h2>
          </div>
          <form>
            <div className="register-box">
              <div className="register-page-form-col">
                <div className="register-page-form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </div>
                <div className="register-page-form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
                <div className="register-page-form-field">
                  <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                </div>
                <div className="register-page-form-field">
                  <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                </div>
              </div>
                <div className="register-page-form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="register-page-form-field">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    required
                  />
              </div>
            <br />
              <button onClick={handleSubmit}>Submit</button>
            <br />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default RegisterBox;
