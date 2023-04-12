import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./universityinfobox.css";
import CreateUniversityBox from "../Create-University/CreateUniversityBox";

const UniversityInfoBox = () => {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const universities = [
    {
      name: "University A",
      description: "Description for University A",
      numberOfStudents: 5000,
      profileId: "123",
      location: "Location A",
      pictures: [],
    },
    {
      name: "University B",
      description: "Description for University B",
      numberOfStudents: 8000,
      profileId: "456",
      location: "Location B",
      pictures: [],
    },
    {
      name: "University C",
      description: "Description for University C",
      numberOfStudents: 12000,
      profileId: "789",
      location: "Location C",
      pictures: [],
    },
  ];

  const handleBackClick = () => {
    window.history.back();
  };

  const handleSelectChange = (event) => {
    const universityName = event.target.value;
    const university = universities.find(
      (uni) => uni.name === universityName
    );
    setSelectedUniversity(university);
  };

  return (
    <div className="container">
      <div>
        <div className="box">
        <h3>Select a university:</h3>
        <select onChange={handleSelectChange}>
          <option value="">Select a university</option>
          {universities.map((uni) => (
            <option key={uni.name} value={uni.name}>
              {uni.name}
            </option>
          ))}
        </select>
        {selectedUniversity && (
          <div>
            <h2>{selectedUniversity.name}</h2>
            <p>{selectedUniversity.description}</p>
            <p>Number of Students: {selectedUniversity.numberOfStudents}</p>
            <p>Profile ID: {selectedUniversity.profileId}</p>
            <p>Location: {selectedUniversity.location}</p>
            <p>Pictures: {selectedUniversity.pictures}</p>
          </div>
        )}
      </div>
    </div>
    <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default UniversityInfoBox;
