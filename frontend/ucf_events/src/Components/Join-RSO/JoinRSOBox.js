import React from "react";
import { useNavigate } from "react-router-dom";
import "./joinRSObox.css";

const JoinRSOBox = () => {
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
      </div>
      <h1>Welcome to the Join RSO Page!</h1>
    </div>
  );
};

export default JoinRSOBox;