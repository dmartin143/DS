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

  return (
    <div>
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
    <div className="container">
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="numOfStudents">Number of Students:</label>
      <input
        type="number"
        id="numOfStudents"
        value={numOfStudents}
        onChange={handleNumOfStudentsChange}
      />

      <label htmlFor="profileID">Profile ID:</label>
      <input
        type="text"
        id="profileID"
        value={profileID}
        onChange={handleProfileIDChange}
      />

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={handleLocationChange}
      />

      <label htmlFor="pictures">Pictures:</label>
      <input
        type="file"
        id="pictures"
        value={pictures}
        onChange={handlePicturesChange}
        multiple
      />

      <button type="submit">Submit</button>

      {/* <UniversityStudentBox
        description={description}
        numOfStudents={numOfStudents}
        profileID={profileID}
        name={name}
        location={location}
        pictures={pictures}
      /> */}
    </div>
    </div>
  );
};

export default CreateUniversityBox;
