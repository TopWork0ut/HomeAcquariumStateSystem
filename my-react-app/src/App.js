import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import DataDiagrams from "./Components/DataDiagrams";
import Register from "./Components/Registeration";
import Login from "./Components/Login";
import "./App.css";
import "./Components/Acquarium";
import "normalize.css";
import "reset-css";
import DCStatistics from "./Components/DCStatistics";
import StepperStatistics from "./Components/StepperStatistics";
import UltrasonicStatistics from "./Components/UltrasonicStatistics";
function App() {
  return (
    // <Router>
    <Routes>
      <Route exact path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path='/' element={<Home/>} />  */}
      <Route path="/home/:loginId" element={<Home />} />
      <Route path="/data/:loginId" element={<DataDiagrams />} />
      <Route path="/data/dc/:loginId" element={<DCStatistics />} />
      <Route path="/data/stepper/:loginId" element={<StepperStatistics />} />
      <Route
        path="/data/ultrasonic/:loginId"
        element={<UltrasonicStatistics />}
      />
    </Routes>
    // </Router>
  );
}

export default App;
