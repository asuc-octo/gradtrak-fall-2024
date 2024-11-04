import React, { useState } from 'react';
import "./App.css";
import Kanban from "./app/Kanban/Kanban"
import SetUpPage from "./components/SetUpPage"
import SemesterBlock from "./components/SemesterBlock"

function App() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  return (
    <>
      {/* <SetUpPage></SetUpPage> */}
      <Kanban />
    </>
  );
}

export default App;
