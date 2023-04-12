import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formgroupbox.css";

const FormGroupBox = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [description, setDescription] = useState("");

  const handleUniInfoClick = () => {
    navigate("/university-info");
  };

  const handleEventInfoClick = () => {
    navigate("/event-info-student");
  };

  const handleJoinRSOClick = () => {
    navigate("/join-rso");
  };

  const handleFormGroupClick = () => {
    navigate("/form-group");
  };

  const handleSeeProfile = () => {
    navigate("/Student");
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    setMembers([...members, newMember]);
    setNewMember("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   groupName,
    //   members,
    //   description,
    // };
    // fetch("/api/create-rso", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       navigate("/Student");
    //     } else {
    //       throw new Error("Network response was not ok");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
      <div className = "box">
      <h1>Welcome to the Request to Create an RSO Page!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Members:
          <ul>
            {members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button onClick={handleAddMember}>Add Member</button>
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Request</button>
      </form>
    </div>
    </div>
  );
};

export default FormGroupBox;
