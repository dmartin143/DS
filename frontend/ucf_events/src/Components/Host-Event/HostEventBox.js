import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hosteventbox.css";
import EventStatusBox from '../Event-Status/EventStatusBox'

const HostEventBox = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can use the values of the state variables to create the event
    // You can send this data to the server or save it locally
    const newEvent = {
      name,
      category,
      description,
      time,
      date,
      location,
      latitude,
      longitude,
      phone,
      email,
      status: "pending", // Add a status field to the event object with a default value of "pending"
    };
    // After submitting the form, you can clear the inputs
    setEvents([...events, newEvent]);
    setName("");
    setCategory("");
    setDescription("");
    setTime("");
    setDate("");
    setLocation("");
    setLatitude("");
    setLongitude("");
    setPhone("");
    setEmail("");
  };
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="container">
      <div className = "box">
      <h1>Welcome to the Host Event Page!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="time">Time:</label>
            <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="date">Date:</label>
            <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="location">Location:</label>
            <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="latitude">Latitude:</label>
            <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="longitude">Longitude:</label>
            <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="phone">Contact Phone:</label>
            <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="email">Contact Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
            </form>
            </div>
            <button onClick={handleBackClick}>Back</button>
            </div>
            );
            };
            
            export default HostEventBox;
