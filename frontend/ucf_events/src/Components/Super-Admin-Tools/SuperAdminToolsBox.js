import React from "react";
import { useNavigate } from "react-router-dom";
import "./superadmintoolsbox.css";

const SuperAdminToolsBox = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    window.history.back();
  };
  const handleCreateUniClick = () => {
    navigate("/create-uni")
  }

  const handleChangeEventStatusClick = () => {
    navigate("/event-status");
  };

  return (
    <div className="container">
      <div className="selections">
        <div className="selection" onClick={handleCreateUniClick}>
          Make University Profile
        </div>
        <div className="selection" onClick={handleChangeEventStatusClick}>
          Private and Public Event Status
        </div>
      </div>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SuperAdminToolsBox;
