import React from "react";
import { useNavigate } from "react-router-dom";
import "./studentbox.css";

const StudentBox = () => {
  const navigate = useNavigate();

  const handleUniInfoClick = () => {
    navigate("/university-info-student");
  }

  const handleEventInfoClick = () => {
    navigate("/event-info-student");
  };

  const handleJoinRSOClick = () => {
    navigate("/join-rso");
  };

  const handleFormGroupClick = () => {
    navigate("/form-group");
  };

  const handleSeeProfile =() => {
    navigate("/student")
  };

  const handleLogOut = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="tabs">
      <div className="tab" onClick={handleUniInfoClick}>
          University Information
        </div>
        <div className="tab" onClick={handleEventInfoClick}>
          Event Information
        </div>
        <div className="tab" onClick={handleJoinRSOClick}>
          Join an RSO
        </div>
        <div className="tab" onClick={handleFormGroupClick}>
          Form a Group
        </div>
        <div className="tab" onClick={handleSeeProfile}>
          See Your Profile
        </div>
        <div className="tab" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
      <h1>Welcome to the Student Home Page!</h1>
    </div>
  );
};

export default StudentBox;