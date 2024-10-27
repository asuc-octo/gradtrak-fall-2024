import { Box } from "@radix-ui/themes";
import React, { useState } from 'react';
import {  Button } from "@radix-ui/themes";
import "./semesterblock.css"

interface SemesterYearProps  {
    selectedYear: number | string;
  };

function SemesterBlock({ selectedYear }: SemesterYearProps) {
    const [classList, setClassList] = useState<string[]>([]);

  const handleAddClass = () => {
    setClassList([...classList, `Class ${classList.length + 1}`]);
  };
    return (
    <div className="container">
      <h2 className="title">Fall {selectedYear} <p className="counter">{classList.length}</p></h2>

      <div className="class-list">
        {classList.map((className, index) => (
          <div key={index} className="class-item">
            {className}
          </div>
        ))}
      </div>

      <Button onClick={handleAddClass} className="add-button">
        + Add Class
      </Button>
    </div>
    )
}

export default SemesterBlock;