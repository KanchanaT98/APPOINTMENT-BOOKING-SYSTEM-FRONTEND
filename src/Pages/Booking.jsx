import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './Booking.css'

const BookingForm = () => {
  const location = useLocation();
  const { date, time } = location.state || {}; 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  
    name: "",
    email: "",
    phone: "",
    date: date || "",
    time: time || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/booking", formData);
      console.log(response.data)  //for debugging
      if(response.data == "Slot Successfully Booked..."){
        alert("Appointment booked successfully!");
        navigate("/appointmentList")
      }else if(response.data == "This Slot is Already Booked, Please try another Slot..."){
        alert("This slot is already taken");
        navigate("/appointmentList")
      }else{
        alert(response.data);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Book Appointment</h2>
      
        <form className='bookingForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder=" Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder=" Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder=" Phone" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="date" value={ formData.date} readOnly />
            <input type="text" name="time" value={ formData.time} readOnly />
            <button type="submit" onClick={handleSubmit}>Confirm Booking</button>
        </form>
      
    </div>
  );
};

export default BookingForm;
