import { useState } from 'react';
import SemesterBlock from "../../components/SemesterBlock"
import './semesters-container.css';

type ClassType = {
  id: number;
  name: string;
  units: number;
};

// this component will manage the state of all semesters
function SemestersContainer() {
  // define semesters configuration
  const semesterConfig = [
    { id: 'fall2023', year: 2023, semester: 'Fall' },
    { id: 'spring2024', year: 2024, semester: 'Spring' },
    { id: 'fall2024', year: 2024, semester: 'Fall' },
    { id: 'spring2025', year: 2025, semester: 'Spring' }
  ];

  // state to track all semester classes and their total units
  const [allSemesters, setAllSemesters] = useState<{ [key: string]: ClassType[] }>({
    fall2023: [],
    spring2024: [],
    fall2024: [],
    spring2025: []
  });

  const [semesterTotalUnits, setSemesterTotalUnits] = useState<{ [key: string]: number }>({
    fall2023: 0,
    spring2024: 0,
    fall2024: 0,
    spring2025: 0
  });

  // update units for a specific semester
  const handleTotalUnitsChange = (semesterId: string, newTotal: number) => {
    setSemesterTotalUnits(prev => ({
      ...prev,
      [semesterId]: newTotal
    }));
  };

  // update all semesters state
  const updateAllSemesters = (semesters: { [key: string]: ClassType[] }) => {
    setAllSemesters(semesters);
  };

  return (
    <div className="semesters-container">
      {semesterConfig.map(config => (
        <SemesterBlock
          key={config.id}
          semesterId={config.id}
          selectedYear={config.year}
          selectedSemester={config.semester}
          onTotalUnitsChange={(newTotal: number) => handleTotalUnitsChange(config.id, newTotal)}
          allSemesters={allSemesters}
          updateAllSemesters={updateAllSemesters}
        />
      ))}
    </div>
  );
}

export default SemestersContainer;