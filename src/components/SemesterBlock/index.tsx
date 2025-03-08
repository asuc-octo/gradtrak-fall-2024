import { useState } from 'react';
import { Button } from "@radix-ui/themes";
import "./semesterblock.css"
import AddClass from "../AddClass/AddClass";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon, FileTextIcon } from '@radix-ui/react-icons';
import { ClassType } from '../../types/types';

interface SemesterYearProps  {
    selectedYear: number | string;
    selectedSemester: string;
    onTotalUnitsChange: (newTotal: number) => void;
  };

function SemesterBlock({ selectedYear, selectedSemester, onTotalUnitsChange }: SemesterYearProps) {

  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const [totalUnits, setTotalUnits] = useState(0);

  const handleDeleteClass = (indexToDelete: number) => {
    const deletedClassUnits = selectedClasses[indexToDelete].unitsMax;
    const newTotalUnits = totalUnits - deletedClassUnits;
    setSelectedClasses((prevClasses) => 
      prevClasses.filter((_, index) => index !== indexToDelete)
    );
    setTotalUnits(newTotalUnits);
    onTotalUnitsChange(newTotalUnits);
    // setTotalUnits((prevTotalUnits) => prevTotalUnits - deletedClassUnits);
  };

  const handleEditClass = () => {};
  const addClass = (cls: ClassType) => {
    setSelectedClasses((prevClasses) => [...prevClasses, cls]);
    const newTotalUnits = totalUnits + cls.unitsMax;
    // setTotalUnits((prevTotal) => prevTotal + cls.units); 
    setTotalUnits(newTotalUnits);
    onTotalUnitsChange(newTotalUnits);

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
              <h3 className="classTitle">{cls.subject} {cls.courseNumber}</h3>
              <p className="units">{cls.unitsMax} Units</p>
            </div>
          ))}
        {/* </div> */}

      {/* Dialog Component */}
      <AddClass isOpen={isAddClassOpen} setIsOpen={setIsAddClassOpen} addClass={addClass} handleOnConfirm={(cls) => {addClass(cls);}}/>

      <Button onClick={() => setIsAddClassOpen(true)} className="add-button">
          + Add Class
        </Button>
      </div>

      
    </div>
    
    )
}

export default SemesterBlock;