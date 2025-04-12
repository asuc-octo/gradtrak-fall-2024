// SemesterHome.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SemesterBlock from "../../components/SemesterBlock";
import { Flex } from '@radix-ui/themes';
import SidePanel from "../../components/SidePanel/SidePanel";
import EditPopup from "../../components/SidePanel/EditPopup"; // Adjust path if needed
import "./SemesterHome.css";

type DegreeOption = { label: string; value: string };
type ClassType = { id: number; name: string; units: number };

function SemesterHome() {
  const location = useLocation();
  const state = location.state as {
    startYear: string;
    gradYear: string;
    summerCheck: boolean;
    selectedDegreeList: DegreeOption[];
    selectedMinorList: DegreeOption[];
  };

  const { startYear, gradYear, summerCheck, selectedDegreeList, selectedMinorList } = state;
  const selectedDegreeStrings: string[] = selectedDegreeList.map((degree) => degree.value);
  const selectedMinorStrings: string[] = selectedMinorList.map((minor) => minor.value);

  // Our user data (for example, fetched from an API).
  const [user, setUser] = useState({
    name: "Yuna Kim",
    majors: selectedDegreeStrings,
    minors: selectedMinorStrings,
  });

  // Control modal open/close state
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Compute the range of years
  const numStartYear = parseInt(startYear, 10);
  const numGradYear = parseInt(gradYear, 10);
  const yearCount = numGradYear - numStartYear + 1;
  const years = Array.from({ length: yearCount }, (_, i) => numStartYear + i);

  // Manage units in each semester
  const [semesterTotals, setSemesterTotals] = useState<Record<string, number>>({});
  const [allSemesters, setAllSemesters] = useState<{ [key: string]: ClassType[] }>({});

  const updateTotalUnits = (semesterKey: string, newTotal: number) => {
    setSemesterTotals((prev) => ({ ...prev, [semesterKey]: newTotal }));
  };

  const updateAllSemesters = (semesters: { [key: string]: ClassType[] }) => {
    setAllSemesters(semesters);
  };

  const totalUnits = Object.values(semesterTotals).reduce((sum, units) => sum + units, 0);

  // Handle saving from the Edit Popup
  const handleSave = (updatedData: {
    name: string;
    majors: string[];
    minors: string[];
    totalUnits: number;
    transferUnits: number;
    pnpTotal: number;
  }) => {
    // Update your user state with new name, majors, minors, etc.
    setUser({
      name: updatedData.name,
      majors: updatedData.majors,
      minors: updatedData.minors,
    });
    // If you want to store or use updatedData.totalUnits, etc., you can handle it here
    setIsEditOpen(false);
    console.log("User info updated in SemesterHome:", updatedData);
  };

  return (
    <>
      <Flex direction="row" height="100vh" className="semester-home">
        {/* Side panel with an 'Edit' button */}
        <SidePanel
          name={user.name}
          majors={user.majors}
          minors={user.minors}
          totalUnits={totalUnits}
          transferUnits={0}
          pnpTotal={0}
          onUpdateUser={handleSave}
          onEditClick={() => setIsEditOpen(true)}
        />

        {/* Main body (semesters) */}
        <Flex direction="column" gap="32px" className="semester-blocks">
          <h3 className="semester-title">Semesters</h3>
          <Flex direction="row" gap="12px" className="semester-layout">
            <SemesterBlock
              semesterId="miscellaneous"
              selectedSemester="Miscellaneous"
              selectedYear=""
              onTotalUnitsChange={(newTotal) => updateTotalUnits("Miscellaneous", newTotal)}
              allSemesters={allSemesters}
              updateAllSemesters={updateAllSemesters}
            />
            {years.map((year) => (
              <Flex key={year} className="year-element" direction="row" gap="12px">
                <SemesterBlock
                  semesterId={`fall-${year}`}
                  selectedSemester="Fall"
                  selectedYear={year}
                  onTotalUnitsChange={(newTotal) => updateTotalUnits(`Fall-${year}`, newTotal)}
                  allSemesters={allSemesters}
                  updateAllSemesters={updateAllSemesters}
                />
                <SemesterBlock
                  semesterId={`spring-${year}`}
                  selectedSemester="Spring"
                  selectedYear={year}
                  onTotalUnitsChange={(newTotal) => updateTotalUnits(`Spring-${year}`, newTotal)}
                  allSemesters={allSemesters}
                  updateAllSemesters={updateAllSemesters}
                />
                {summerCheck && (
                  <SemesterBlock
                    semesterId={`summer-${year}`}
                    selectedSemester="Summer"
                    selectedYear={year}
                    onTotalUnitsChange={(newTotal) => updateTotalUnits(`Summer-${year}`, newTotal)}
                    allSemesters={allSemesters}
                    updateAllSemesters={updateAllSemesters}
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>

      {/* The EditPopup appears at the top level so it can overlay the entire screen. 
          We pass isOpen and onClose for a controlled dialog, plus onSave for the form. */}
      <EditPopup
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        name={user.name}
        majors={user.majors}
        minors={user.minors}
        totalUnits={totalUnits}
        transferUnits={0}
        pnpTotal={0}
        onSave={handleSave}
      />
    </>
  );
}

export default SemesterHome;
