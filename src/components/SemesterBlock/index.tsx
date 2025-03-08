import { useState, useEffect } from 'react';
import { Button } from "@radix-ui/themes";
import "./semesterblock.css";
import AddClass from "../AddClass/AddClass";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon, FileTextIcon } from '@radix-ui/react-icons';
import CustomClass from "../CustomClass/custom-class";

interface SemesterYearProps  {
    selectedYear: number | string;
    selectedSemester: string;
    onTotalUnitsChange: (newTotal: number) => void;
    semesterId: string; // id for every semester
    allSemesters: { [key: string]: ClassType[] }; // every semester and their classes
    updateAllSemesters: (semesters: { [key: string]: ClassType[] }) => void; // function to update all semester
}

  type ClassType = {
    id: number;
    name: string;
    units: number;
  };

  function SemesterBlock({ 
    selectedYear, 
    selectedSemester, 
    onTotalUnitsChange, 
    semesterId,
    allSemesters,
    updateAllSemesters
  }: SemesterYearProps) {

  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>(allSemesters[semesterId] || []);
  const [totalUnits, setTotalUnits] = useState(0);
  const [isCustomClassOpen, setIsCustomClassOpen] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

  // get the total units when selectedClasses change
  useEffect(() => {
    const total = selectedClasses.reduce((sum, cls) => sum + cls.units, 0);
    setTotalUnits(total);
    onTotalUnitsChange(total);
  }, [selectedClasses, onTotalUnitsChange]);

  // update local state when allSemesters changes
  useEffect(() => {
    if (allSemesters[semesterId]) {
      setSelectedClasses(allSemesters[semesterId]);
    }
  }, [allSemesters, semesterId]);

  const openCustomClass = () => setIsCustomClassOpen(true);
  const closeCustomClass = () => {
    setIsCustomClassOpen(false);
  };

  const handleDeleteClass = (indexToDelete: number) => {
    const updatedClasses = selectedClasses.filter((_, index) => index !== indexToDelete);
    
    // update local state
    setSelectedClasses(updatedClasses);
    
    // update global state
    const updatedSemesters = {
      ...allSemesters,
      [semesterId]: updatedClasses
    };
    updateAllSemesters(updatedSemesters);
  };

  const handleEditClass = () => {};

  const addClass = (cls: ClassType) => {
    const updatedClasses = [...selectedClasses, cls];
    
    // update local state
    setSelectedClasses(updatedClasses);
    
    // update global state
    const updatedSemesters = {
      ...allSemesters,
      [semesterId]: updatedClasses
    };
    updateAllSemesters(updatedSemesters);
  };

  // drag event handlers
  const handleDragStart = (e: React.DragEvent, classIndex: number) => {
    // store the semester ID and class index in the drag data
    e.dataTransfer.setData("application/json", JSON.stringify({
      sourceSemesterId: semesterId,
      classIndex: classIndex,
      class: selectedClasses[classIndex]
    }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
    setIsDropTarget(true);
  };

  const handleDragLeave = () => {
    setIsDropTarget(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropTarget(false);
    
    try {
      // get the dragged class data
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { sourceSemesterId, classIndex, class: draggedClass } = data;
      
      // don't do anything if dropping back to the same semester
      if (sourceSemesterId === semesterId) return;
      
      // remove class from source semester
      const sourceSemesterClasses = [...allSemesters[sourceSemesterId]];
      sourceSemesterClasses.splice(classIndex, 1);
      
      // add class to target semester (this semester)
      const targetSemesterClasses = [...selectedClasses, draggedClass];
      
      // update all semesters
      const updatedSemesters = {
        ...allSemesters,
        [sourceSemesterId]: sourceSemesterClasses,
        [semesterId]: targetSemesterClasses
      };
      
      // update the global state
      updateAllSemesters(updatedSemesters);
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <div 
      className={`semesters ${isDropTarget ? 'drop-target' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="container">
        <div className="semesterCount">
          <h2 className="title">{selectedSemester} {selectedYear} </h2>
          <p className="counter">{totalUnits}</p>
        </div>

        {/* display selected classes with drag functionality */}
        {selectedClasses.map((cls, index) => (
          <div 
            key={index} 
            className="classContainer"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button className="dropDownBtn">
                  <DotsHorizontalIcon className="three-dot-icon" />
                </Button>
              </DropdownMenu.Trigger>

              {/* dropdown menu content */}
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

        {/* dialog component */}
        <AddClass 
          isOpen={isAddClassOpen} 
          setIsOpen={setIsAddClassOpen} 
          addClass={addClass} 
          handleOnConfirm={(cls) => {addClass(cls);}}
        />

        <Button onClick={() => setIsAddClassOpen(true)} className="add-button">
          + Add Class
        </Button>
      </div>
    </div>
  );
}

export default SemesterBlock;