import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyBookings.css";

const MyBookings = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [idArray, setIdArray] = useState([]);
  
    useEffect(() => {
      fetchAvailableSlots();
    }, []);
  
    const fetchAvailableSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8080/api/mybookings");
        console.log(response.data);
        setAvailableSlots(response.data);
        const ids = response.data.map(slot => slot.bookingId);
        setIdArray(ids);
        console.log(ids);
      } catch (error) {
        setError("Failed to load available slots.");
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const cancelBookings = async (idx) => {
      const bookingNo = idArray[idx]; //get the database attribute bookingId of the canceled booking
      console.log(bookingNo);
      try {
        const response = await axios.delete(`http://localhost:8080/api/appointments/${bookingNo}`);
        console.log(response.data);
        if (response.data === "Booking Deleted Successfully...!") {
          alert("Booking Deleted Successfully...!");
          fetchAvailableSlots(); // Refresh the list after deletion
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Failed to cancel booking.");
        console.error("Error canceling booking:", error);
      }
    };
  
    return (
      <div className="container">
        <h2 className="title">My Bookings</h2>
  
        {loading && <p className="loading">Loading slots...</p>}
        {error && <p className="error">{error}</p>}
  
        {availableSlots.length > 0 ? (
          <ul className="slot-list">
            {availableSlots.map((slot,idx) => (
              <li className="slot-item">
                <span>{slot.date} from {slot.time}</span>
                <button className="cancel-button"  onClick={() => cancelBookings(idx)}>Cancel</button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="no-slots">No available slots</p>
        )}
      </div>
    );
  };
  
  export default MyBookings;