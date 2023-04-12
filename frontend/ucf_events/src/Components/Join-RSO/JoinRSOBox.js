import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./joinRSObox.css";
// import { joinRSO } from "./api"; // import the joinRSO function from the API file

const JoinRSOBox = () => {
  const navigate = useNavigate();
  const [rsoId, setRsoId] = useState("");
  const [userId, setUserId] = useState("");

  const handleUniInfoClick = () => {
    navigate("/university-info");
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
    navigate("/Student")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await joinRSO(rsoId, userId); // call the joinRSO function with the RSO ID and User ID
    //   alert("You have successfully joined the RSO!");
    // } catch (error) {
    //   alert(error.message);
    // }
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
      <div className="box">
      <h1>Welcome to the Join RSO Page!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          RSO ID:
          <input type="text" value={rsoId} onChange={(e) => setRsoId(e.target.value)} />
        </label>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <button type="submit">Join RSO</button>
      </form>
    </div>
    </div>
  );
};

export default JoinRSOBox;
