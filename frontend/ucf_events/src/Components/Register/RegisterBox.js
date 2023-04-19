import React, { useState, useEffect } from "react";
import "./registerbox.css";
import { useNavigate } from "react-router-dom";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from 'react-router-dom';
// import AdminBox from "../Admin-Home";
// import StudentBox from "../Student-Home";

import ucfLogo from '../../Images/ucf_logo.PNG';
import {headers, route} from "../../requestUtils.js";

const RegisterBox = ({ handleRegister, callback }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [account1, setAccount1] = useState('');
  const [account2, setAccount2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, [username, password, passwordConfirm, account1, account2, userType, email, lastName, firstName]);

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

  const handleAccount1 = (event) => {
    setAccount1(event.target.value);
  };

  const handleAccount2 = (event) => {
    setAccount2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailParts = email.split('@');
    if (emailParts.length != 2) {
      setError('Invalid email');
      return;
    }
    const emailSuffix = emailParts[1];
    const isAdmin = (userType == 'Admin') ? true : false;
    
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      emailSuffix: emailSuffix,
      username: username,
      password: password,
      userType: userType,
      isSuperAdmin: isAdmin,
      account1: account1,
      account2: account2
    };
  
    let options = {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(newUser)
    }
    fetch(route + '/register', options)
    .then((response) => {
      if (response.status === 409) {
        setError('Username is taken');
      } else if (response.status === 200){
        if (userType === "student") {
          navigate("/Student");
          console.log('navigating to student page');
        } else if (userType === "Admin") {
          navigate("/Admin");
          console.log('navigating to student page');
        }
      } else {
        response.json().then((response) => {
          setError(response.message);
        })
      }
    })
    .catch(error => {
      setError('An issue occured with registration');
      console.log('handleSubmit error:', error);

    });
    console.log('handleSubmit called');

  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div className="register-page-logo">
            <img src={ucfLogo} alt="Logo" />
          </div>
        </div>
      <div className="column">
        <div className="register-page-form">
          <div className="register-page-form-header">
            <h2>Register</h2>
          </div>
          <form>
            <div className="register-box">
              <div className="register-page-form-col">
                
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                
                <br />
                
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                
                <br />
               
                  <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                
                <br />
                
                  <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />

              <br />
                
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                
                <br />
                
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    required
                  />
              
              <br />
                <label htmlFor="userType">User Type:</label>
                <select
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
                <br />
                
                <label htmlFor="googleAccount">Add a Google Account!</label>
                <input
                  type="account1"
                  id="text"
                  name="account1"
                  value={account1}
                  onChange={handleAccount1}
                  required
                />
                <br />
                
                <label htmlFor="instaAccount">Add an Instagram Account!</label>
                <input
                  type="account2"
                  id="text"
                  name="account2"
                  value={account2}
                  onChange={handleAccount2}
                  required
                />
                <br />
                {error && <div className="error">{error}</div>}
                <button onClick={handleSubmit}>Submit</button>
              <br />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default RegisterBox;
