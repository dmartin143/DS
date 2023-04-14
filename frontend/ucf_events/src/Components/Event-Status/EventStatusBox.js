import React from "react";
import "./eventstatusbox.css";

const EventStatusBox = () => {
//   const {
//     name,
//     category,
//     description,
//     time,
//     date,
//     location,
//     latitude,
//     longitude,
//     phone,
//     email,
//     status
//   } = event;

//   const handleApprove = () => {
//     onApprove(event);
//   };

//   const handleDisapprove = () => {
//     onDisapprove(event);
//   };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Event Status Box</h1>
        {/* <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Latitude:</strong> {latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {longitude}
        </p>
        <p>
          <strong>Contact Phone:</strong> {phone}
        </p>
        <p>
          <strong>Contact Email:</strong> {email}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p> */}
        {/* <div className="buttons">
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleDisapprove}>Disapprove</button>
        </div> */}
      </div>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default EventStatusBox;
