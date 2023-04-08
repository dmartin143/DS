import React from "react";
import { useNavigate } from "react-router-dom";
import "./superadmintoolsbox.css";

const SuperAdminToolsBox = () => {
  const navigate = useNavigate();

  const handleUniInfoClick = () => {
    navigate("/university-info");
  };

  const handleEventInfoClick = () => {
    navigate("/event-info");
  };

  const handleCreateRSOClick = () => {
    navigate("/create-RSO");
  };

  const handleHostEventClick = () => {
    navigate("/host-event");
  };

  const handleSeeProfile = () => {
    navigate("/profile");
  };

  const handleSeeSuperAdminRoles = () => {
    // if the admin has more than 6 RSOs
    navigate("/super-admin");
    // if not then, print on the screen that they are not qualified yet
  };

  const handleCreateUniClick = () => {
    navigate("/create-uni")
  }

  const handleChangeEventStatusClick = () => {
    navigate("/event-status");
  };
  const handleCreateEventClick = () => {
    navigate("/create-event");
  };

  return (
    <div className="admin-home">
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
      <div className="selections">
        <div className="selection" onClick={handleCreateUniClick}>
          Make University Profile
        </div>
        <div className="selection" onClick={handleChangeEventStatusClick}>
          Private and Public Event Status
        </div>
        <div className="selection" onClick={handleCreateEventClick}>
          Create Event
        </div>
      </div>
    </div>
  );
};

export default SuperAdminToolsBox;