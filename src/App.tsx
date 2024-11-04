import React, { useState } from 'react';
import "./App.css";
import SetUpPage from "./components/SetUpPage"
import SemesterBlock from "./components/SemesterBlock"

function App() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  return (
    <>
      {/* <SetUpPage></SetUpPage> */}
      <SemesterBlock selectedYear={2021}></SemesterBlock>
    </>
  );
}

export default App;
