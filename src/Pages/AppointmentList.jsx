import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AppointmentList.css";

const AppointmentList = () => {
  const [availableSlots, setAvailableSlots] = useState([]); 
  const [loading, setLoading] = useState(false);              //state variables to indicate loading
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/api/appointment");
      console.log(response.data);            //logs to check the response from the backend
      setAvailableSlots(response.data);
    } catch (error) {
      setError("Failed to load available slots.");
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (slot) => {
    navigate("/booking", { state: { date: slot.date, time: slot.time } });  //transfer data to autofill
  };

  const handleMyBookings = () => {
    navigate("/mybookings");  
  };

  return (
    <div className="container">
      <h2 className="title">Available Appointments</h2>

      {loading && <p className="loading">Loading slots...</p>}
      {error && <p className="error">{error}</p>}

      {availableSlots.length > 0 ? (
        <ul className="slot-list">
          {availableSlots.map((slot) => (
            <li key={slot.id} className="slot-item">
              <span>{slot.date} from {slot.time}</span>
              <button className="book-button" onClick={() => handleBook(slot)}>Book</button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="no-slots">No available slots</p>
      )}
      <button className="myBookings-button" onClick={() => handleMyBookings()}>My Bookings</button>
    </div>
  );
};

export default AppointmentList;