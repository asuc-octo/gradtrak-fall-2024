import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import "@radix-ui/themes/styles.css";
import "./setup.css"
import { Flex, Text, Button, Checkbox } from "@radix-ui/themes";
import YearDropdown from "./year-dropdown";


function SetUpPage() {
  const navigate = useNavigate();
  const [startYear, setStartYear] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [summerCheck, setSummerCheck] = useState(false);

  const handleSelectYear = (id: string, year: string) => {
    if (id === 'startYear') {
      setStartYear(year);
    } else if (id === 'gradYear') {
      setGradYear(year);
    }
  };

  const handleNextClick = () => {
    navigate('/add-major', { state: { startYear, gradYear, summerCheck } });
  };


  const handleSummerCheck = (checked: boolean) => {
    setSummerCheck(checked);
  }

  return (
    <Flex className="setup-container" direction="column" gap="32px" width="100%" align="center">
      <Flex direction="column" gap="8px" width="100%" align="center">
        <h1>Set Up</h1>
        <p className="secondary-text">
          Enter your start year and graduation year
        </p>
      </Flex>

      <Flex className= "yearContainer" direction="row" gap="16px" align="center">
        <Flex direction="column" width="50%">
          <Text>Start Year</Text>
          <YearDropdown id="startYear" onSelectYear={handleSelectYear}></YearDropdown>
        </Flex>

        <Flex direction="column" width="50%">
          <Text>Graduation Year</Text>
          <YearDropdown id="gradYear" onSelectYear={handleSelectYear}></YearDropdown>
        </Flex>
      </Flex>
	  

      <Text as="label" size="2" className='summer-sem-check'>
        <Flex gap="2">
          <Checkbox defaultChecked checked = {summerCheck} onCheckedChange={handleSummerCheck}/>
          Include Summer Semesters?
        </Flex>
      </Text>
      <button className="primary"  onClick={handleNextClick}>Next</button>
		</Flex>
  );
}

export default SetUpPage;
