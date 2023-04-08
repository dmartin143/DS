import React from "react";
import { useNavigate } from "react-router-dom";
import "./studentbox.css";

const StudentBox = () => {
  const navigate = useNavigate();

  const handleEventInfoClick = () => {
    navigate("/event-info");
  };

  const handleJoinRSOClick = () => {
    navigate("/join-rso");
  };

  const handleFormGroupClick = () => {
    navigate("/form-group");
  };

  const handleSeeProfile =() => {
    navigate("/profile")
  };

  return (
    <div className="admin-home">
      <div className="tabs">
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
      </div>
      <h1>Welcome to the Student Home Page!</h1>
    </div>
  );
};

export default StudentBox;