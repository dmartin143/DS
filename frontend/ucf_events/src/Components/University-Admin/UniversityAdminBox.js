import React from "react";
import { useNavigate } from "react-router-dom";
import "./universityadminbox.css";

const UniversityAdminBox = () => {
 
  const navigate = useNavigate();

  const handleUniInfoClick = () => {
    navigate("/university-info-admin");
  };

  const handleEventInfoClick = () => {
    navigate("/event-info-admin");
  };

  const handleCreateRSOClick = () => {
    navigate("/create-RSO");
  };

  const handleHostEventClick = () => {
    navigate("/host-event");
  };

  const handleSeeProfile = () => {
    navigate("/admin");
  };

  const handleSeeSuperAdminRoles = () => {
    // if the admin has more than 6 RSOs
    navigate("/super-admin");
    // if not then, print on the screen that they are not qualified yet
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
        <div className="tab" onClick={handleCreateRSOClick}>
          Create an RSO
        </div>
        <div className="tab" onClick={handleHostEventClick}>
          Host Event
        </div>
        <div className="tab" onClick={handleSeeProfile}>
          See Your Profile
        </div>
        <div className="tab" onClick={handleSeeSuperAdminRoles}>
          Super Admin Resources
        </div>
      </div>
      <h1>Welcome to the University Info Page!</h1>

    </div>
      
      //show list of public events
      //show list of RSO events
  );
};

export default UniversityAdminBox;