import { useState } from 'react';
import { Button } from "@radix-ui/themes";
import "./semesterblock.css"
import AddClass from "../AddClass/AddClass";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon, FileTextIcon } from '@radix-ui/react-icons';
import CustomClass from "../CustomClass/custom-class";
import EditClassDetails from "./EditClassDetails.tsx";
import AddClassDetails from "./AddClassDetails.tsx";


interface SemesterYearProps  {
  selectedYear: number | string;
  selectedSemester: string;
  onTotalUnitsChange: (newTotal: number) => void;
};

type ClassType = {
  id: number;
  name: string;
  units: number;
};

function SemesterBlock({ selectedYear, selectedSemester, onTotalUnitsChange }: SemesterYearProps) {
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState<ClassType | null>(null);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const [totalUnits, setTotalUnits] = useState(0);
  const [isCustomClassOpen, setIsCustomClassOpen] = useState(false);

  const openCustomClass = () => setIsCustomClassOpen(true);
  const closeCustomClass = () => {
    setIsCustomClassOpen(false)
  };

  const handleDeleteClass = (indexToDelete: number) => {
    const deletedClassUnits = selectedClasses[indexToDelete].units;
    const newTotalUnits = totalUnits - deletedClassUnits;
    setSelectedClasses((prevClasses) =>
        prevClasses.filter((_, index) => index !== indexToDelete)
    );
    setTotalUnits(newTotalUnits);
    onTotalUnitsChange(newTotalUnits);
    // setTotalUnits((prevTotalUnits) => prevTotalUnits - deletedClassUnits);
  };

  const handleEditClass = (index: number) => {
    setClassToEdit(selectedClasses[index]);
    setIsEditClassOpen(true);
  };

  const handleUpdateClass = (updatedClass: ClassType) => {
    setSelectedClasses((prevClasses) =>
        prevClasses.map((cls, idx) =>
            cls.id === updatedClass.id ? updatedClass : cls
        )
    );


    // Recalculate total units
    const newTotalUnits = selectedClasses.reduce((total, cls) => {
      if (cls.id === updatedClass.id) {
        return total + updatedClass.units;
      }
      return total + cls.units;
    }, 0);

    setTotalUnits(newTotalUnits);
    onTotalUnitsChange(newTotalUnits);
    setIsEditClassOpen(false);
    setClassToEdit(null);
  };
  const addClass = (cls: ClassType) => {
    setSelectedClasses((prevClasses) => [...prevClasses, cls]);
    const newTotalUnits = totalUnits + cls.units;
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
                        onClick={() => handleEditClass(index)}
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
          <AddClass isOpen={isAddClassOpen} setIsOpen={setIsAddClassOpen} addClass={addClass} handleOnConfirm={(cls) => {addClass(cls);}}/>

          {/* Edit Class Details Dialog */}
          {classToEdit && (
              <EditClassDetails
                  isOpen={isEditClassOpen}
                  setIsOpen={setIsEditClassOpen}
                  classData={classToEdit}
                  onUpdate={handleUpdateClass}
              />
          )}

          <Button onClick={() => setIsAddClassOpen(true)} className="add-button">
            + Add Class
          </Button>
        </div>


      </div>

  )
}

export default SemesterBlock;