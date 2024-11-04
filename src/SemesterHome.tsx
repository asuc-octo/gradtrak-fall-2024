import React from 'react';
import { useLocation } from 'react-router-dom';
import SemesterBlock from "./components/SemesterBlock"
import { Flex } from '@radix-ui/themes';
import "./App.css"


function SemesterHome() {
  const location = useLocation();
  const { startYear, gradYear, summerCheck } = location.state || {};

  const numStartYear = parseInt(startYear, 10);
  const numGradYear = parseInt(gradYear, 10);
  const yearCount = numGradYear - numStartYear + 1;
  const years = Array.from(
    { length: yearCount }, 
    (_, i) => numStartYear + i
  );

  return (
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
  );
}

export default SemesterHome;