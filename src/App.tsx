import React, { useState } from 'react';
import "./App.css";
import Kanban from "./app/Kanban/Kanban";
import Onboarding from "./app/Onboarding/Onboarding";
import SetUpPage from "./components/SetUpPage";
import SemesterBlock from "./components/SemesterBlock";

function App() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  return (
    <>
      {/* <SetUpPage></SetUpPage> */}
      <Onboarding />
    </>
  );
}

export default App;
