import { Box } from "@radix-ui/themes";
import React, { useState } from 'react';
import { Button } from "@radix-ui/themes";
import "./semesterblock.css"
import AddClass from "../AddClass/AddClass";

interface SemesterYearProps  {
    selectedYear: number | string;
    selectedSemester: string;
  };

  type ClassType = {
    id: number;
    name: string;
    units: number;
  };

function SemesterBlock({ selectedYear, selectedSemester }: SemesterYearProps) {
    const [classList, setClassList] = useState<string[]>([]);

  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const [totalUnits, setTotalUnits] = useState(0);

  const handleDeleteClass = (name: string) => {
    setClassList(classList.filter((className) => className !== name));
  };
  const handleEditClass = () => {};
  const addClass = (cls: ClassType) => {
    setSelectedClasses((prevClasses) => [...prevClasses, cls]);
    setTotalUnits((prevTotal) => prevTotal + cls.units); // Update total units
  };

    return (
    <div className="semesters">
      <div className="container">
        <div className="semesterCount">
          <h2 className="title">{selectedSemester} {selectedYear} </h2>
          <p className="counter">{totalUnits}</p>
        </div>

        {/* Display selected classes outside the dialog */}
        {/* <div className="classContainer"> */}
          {selectedClasses.map((cls, index) => (
            <div key={index} className="classContainer">
              <h3 className="classTitle">{cls.name}</h3>
              <p className="units">{cls.units} Units</p>
            </div>
          ))}
        {/* </div> */}

      {/* Dialog Component */}
      <AddClass isOpen={isAddClassOpen} setIsOpen={setIsAddClassOpen} addClass={addClass} />

      <Button onClick={() => setIsAddClassOpen(true)} className="add-button">
          + Add Class
        </Button>
      </div>

      
    </div>
    
    )
}

export default SemesterBlock;