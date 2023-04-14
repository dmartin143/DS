//inputs still need to be put in the database
import React, { useState } from "react";
// import UniversityStudentBox from './Components/University-Student/UniversityStudentBox';
import { useNavigate } from "react-router-dom";
const CreateUniversityBox = () => {
  const [description, setDescription] = useState("");
  const [numOfStudents, setNumOfStudents] = useState(0);
  const [profileID, setProfileID] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pictures, setPictures] = useState([]);
  const navigate = useNavigate();
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
    navigate("/student")
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNumOfStudentsChange = (event) => {
    setNumOfStudents(parseInt(event.target.value));
  };

  const handleProfileIDChange = (event) => {
    setProfileID(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePicturesChange = (event) => {
    const newPictures = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setPictures(newPictures);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleBackClick = () => {
    window.history.back();
  };
  return (
<div className="container">
  <div className="box">
    <h1>Create University Profile</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="numOfStudents">Number of Students:</label>
        <input
          type="number"
          id="numOfStudents"
          value={numOfStudents}
          onChange={handleNumOfStudentsChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="profileID">Profile ID:</label>
        <input
          type="text"
          id="profileID"
          value={profileID}
          onChange={handleProfileIDChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="pictures">Pictures:</label>
        <input
          type="file"
          id="pictures"
          value={pictures}
          onChange={handlePicturesChange}
          multiple
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
  <button onClick={handleBackClick}>Back</button>
</div>

  );
};

export default CreateUniversityBox;
