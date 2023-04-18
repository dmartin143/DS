import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createRSObox.css";

const CreateRSOBox = () => {
  const navigate = useNavigate();

  // Define state for RSO inputs
  const [rsoID, setRSOID] = useState("");
  const [rsoName, setRSOName] = useState("");
  const [rsoDescription, setRSODescription] = useState("");

  const handleBackClick = () => {
    window.history.back();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Code to create new RSO using rsoID, rsoName, and rsoDescription
    console.log(`Creating new RSO: ${rsoID}, ${rsoName}, ${rsoDescription}`);
    // Clear inputs after submit
    setRSOID("");
    setRSOName("");
    setRSODescription("");
  };

  return (
    <div className="container">
      <div className="box">
      <h1>Welcome to the Create RSO Page!</h1>

      {/* Add RSO creation form */}
      <form onSubmit={handleFormSubmit}>
        <label>
          RSO ID:
          <input
            type="text"
            value={rsoID}
            onChange={(event) => setRSOID(event.target.value)}
          />
        </label>
        <br/>
        <label>
          RSO Name:
          <input
            type="text"
            value={rsoName}
            onChange={(event) => setRSOName(event.target.value)}
          />
        </label>
        <br/>
        <label>
          RSO Description:
          <textarea
            value={rsoDescription}
            onChange={(event) => setRSODescription(event.target.value)}
          />
        </label>
        <br/>
        <button type="submit">Create RSO</button>
      </form>
      </div>
      {/* show list of public events */}
      {/* show list of RSO events */}
      
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default CreateRSOBox;
