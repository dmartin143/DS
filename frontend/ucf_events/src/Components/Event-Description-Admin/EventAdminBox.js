import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eventadminbox.css";

const EventAdminBox = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("public"); // initialize event type as "public"

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const events = [
    {
      name: "Event 1",
      description: "Description of Event 1",
      location: "Location 1",
      rating: 4.5,
      comments: ["Comment 1", "Comment 2"],
      type: "public",
    },
    {
      name: "Event 2",
      description: "Description of Event 2",
      location: "Location 2",
      rating: 3.2,
      comments: ["Comment 3"],
      type: "private",
    },
    {
      name: "Event 3",
      description: "Description of Event 3",
      location: "Location 3",
      rating: 2.7,
      comments: ["Comment 4", "Comment 5", "Comment 6"],
      type: "rso",
    },
  ];

  const handleBackClick = () => {
    window.history.back();
  };

  const filteredEvents = events.filter((event) => event.type === eventType);

  return (
    <div className="container">
      <div className="box">
      <h2>What type of event would you like to see?</h2>
      <select value={eventType} onChange={handleEventTypeChange}>
        <option value="public">Public Events</option>
        <option value="rso">RSO Events</option>
      </select>
      {filteredEvents.map((event) => (
        <div key={event.name}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.rating}</p>
          <ul>
            {event.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default EventAdminBox;
