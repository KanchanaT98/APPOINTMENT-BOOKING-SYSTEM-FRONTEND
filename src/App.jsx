import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentList from "./Pages/AppointmentList"
import Booking from "./Pages/Booking";
import MyBookings from "./Pages/MyBookings";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/appointmentList" element={<AppointmentList/>}/>
        <Route path="/booking" element={<Booking/>} />
        <Route path="/mybookings" element={<MyBookings/>} />

      </Routes>
    </Router>
  );
}

export default App;