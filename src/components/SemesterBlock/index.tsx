import { Box } from "@radix-ui/themes";
import React, { useState } from 'react';
import { Button } from "@radix-ui/themes";
import "./semesterblock.css"
import AddClass from "../AddClass/AddClass";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon, FileTextIcon } from '@radix-ui/react-icons';


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

  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const [totalUnits, setTotalUnits] = useState(0);

  const handleDeleteClass = (indexToDelete: number) => {
    const deletedClassUnits = selectedClasses[indexToDelete].units;
    setSelectedClasses((prevClasses) => 
      prevClasses.filter((_, index) => index !== indexToDelete)
    );
    setTotalUnits((prevTotalUnits) => prevTotalUnits - deletedClassUnits);
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
              <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Button className="dropDownBtn">
                            <DotsHorizontalIcon className="three-dot-icon" />
                        </Button>
                    </DropdownMenu.Trigger>

                    {/* Dropdown Menu Content */}
                    <DropdownMenu.Content
                    className="three-dot-menu"
                    sideOffset={5}
                    align="end"
                    >
                    <DropdownMenu.Item
                        className="menu-item"
                        onClick={handleEditClass}
                    >
                        <FileTextIcon/> Edit Course Details
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="menu-item"
                        onClick={() => handleDeleteClass(index)}
                    >
                        <TrashIcon/> Delete Class
                    </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
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