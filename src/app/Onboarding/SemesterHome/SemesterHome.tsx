import React from 'react';
import { useLocation } from 'react-router-dom';
import SemesterBlock from "../../../components/SemesterBlock"
import { Flex, Button } from '@radix-ui/themes';
import SidePanel from "../../../components/SidePanel/SidePanel" 
import { requirements } from "../../../components/SidePanel/types"
import "./SemesterHome.css"

type DegreeOption = {
  label: string;
  value: string;
};

function SemesterHome() {
  const location = useLocation();
  const state = location.state as {
    startYear: string;
    gradYear: string;
    summerCheck: boolean;
    selectedDegreeList: DegreeOption[];
};
  const { startYear, gradYear, summerCheck, selectedDegreeList } = state;
  const selectedDegreeStrings: string[] = selectedDegreeList.map((degree) => degree.value);


  // Pretend this is the queried data
  const user = {
    "name": "Khankamol Chor Kongrukgreatiyos",
    "majors": selectedDegreeStrings,
    "minors": []
  }

  const numStartYear = parseInt(startYear, 10);
  const numGradYear = parseInt(gradYear, 10);
  const yearCount = numGradYear - numStartYear + 1;
  const years = Array.from(
    { length: yearCount }, 
    (_, i) => numStartYear + i
  );

  return (
    <>
      <Flex direction="row" height="100vh" className='semester-home'>
        {/* Side panel */}
          <SidePanel 
            name={user.name} 
            majors={user.majors} 
            minors={user.minors}
            totalUnits={140}
            transferUnits={40}
            pnpTotal={15}
            requirements={requirements}
          />

        {/* Page body */}
          <Flex direction="column" gap="32px">
            <h3 className='semester-title'>Semesters</h3>
            <Flex direction="row" gap="12px" className='semester-layout'>
              <SemesterBlock selectedSemester={"Miscellaneous"} selectedYear={""}></SemesterBlock>
                {years.map((year) => (
                    <Flex key={year} className="year-element" direction="row" gap="12px">
                      <SemesterBlock selectedSemester={"Fall"} selectedYear={year}></SemesterBlock>
                      <SemesterBlock selectedSemester={"Spring"} selectedYear={year}></SemesterBlock>
                      {summerCheck &&
                        <SemesterBlock selectedSemester={"Summer"} selectedYear={year}></SemesterBlock>
                      }
                    </Flex>
                  ))}
            </Flex>
          </Flex>
      </Flex>
    </>
  );
}

export default SemesterHome;