import React, { useState } from 'react';
import "@radix-ui/themes/styles.css";
import "./setup.css"
import { Flex, Text, Button, Checkbox } from "@radix-ui/themes";
import YearDropdown from "./year-dropdown";


function SetUpPage() {

  return (
    <Flex className="container" direction="column" gap="0" width="100%" align="center">
			<Text className="setup">Set Up</Text>
      <Text className="enteryear">Enter your start year and graduation year</Text>

      <Flex className= "yearContainer" direction="row" gap="16px" align="center">
        <Flex direction="column">
          <Text>Start Year</Text>
          <YearDropdown></YearDropdown>
        </Flex>

        <Flex direction="column">
          <Text>Graduation Year</Text>
          <YearDropdown></YearDropdown>
        </Flex>
      </Flex>
	  

      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox defaultChecked />
          Include Summer Semesters?
        </Flex>
      </Text>
			<Button>Next</Button>
		</Flex>
  );
}

export default SetUpPage;
