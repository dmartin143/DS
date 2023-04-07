import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminbox.css";

const AdminHome = () => {
  const navigate = useNavigate();

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
    navigate("/AdminProfile");
  };

  const handleSeeSuperAdminRoles = () => {
    // if the admin has more than 6 RSOs
    navigate("/super-admin-roles");
    // if not then, print on the screen that they are not qualified yet
  }

  return (
    <div className="admin-home">
      <div className="tabs">
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
      <h1>Welcome to the Admin Home Page!</h1>
    </div>
  );
};

export default AdminHome;