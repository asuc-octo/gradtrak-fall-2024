import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetUpPage from "./components/SetUpPage"
import SemesterHome from './SemesterHome';
// import SemesterBlock from "./components/SemesterBlock"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetUpPage />} />
        <Route path="/next" element={<SemesterHome />} />
      </Routes>
    </Router>
  );
}

export default App;
