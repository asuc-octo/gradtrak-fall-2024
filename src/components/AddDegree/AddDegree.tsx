import React, { useState } from 'react';
import Select from 'react-select'
import { Separator, Flex } from "@radix-ui/themes";
import MAJORS from './majors.json';
import "./AddDegree.css";

type DegreeOption = {
    label: string;
    value: string;
};

// Not sure what other props we might want to pass in...
// - Where would we be getting the list of Majors/Minors from?
// - Would we want to move some functions to the main set-up tsx page and pass it in as props?
// - Other considerations: 
type AddDegreeProps = {
    isMajor: boolean;
};

export default function AddDegree({ isMajor }: AddDegreeProps) {
    const optionType = isMajor ? "Major" : "Minor";
    const [selectedDegree, setSelectedDegree] = useState<DegreeOption | null>(null);
    const [selectedDegreeList, setSelectedDegreeList] = useState<DegreeOption[]>([]);

    // Hardcoded majors for now
	const degreeOptions = MAJORS.map((degree) => ({
		label: degree,
		value: degree
	}));
    
    const handleAddDegree = () => {
        if (selectedDegree && !selectedDegreeList.some((degree) => degree.value === selectedDegree.value)) {
            setSelectedDegreeList([...selectedDegreeList, selectedDegree]);
        }
    };
    
    const handleRemoveDegree = (degreeToRemove: DegreeOption) => {
        setSelectedDegreeList(selectedDegreeList.filter((degree) => degree.value !== degreeToRemove.value));
    };

    const DegreeSelect = () => (
        <Select 
            className="degree-select" 
            options={degreeOptions} 
            isSearchable={true} 
            isClearable={true}
            placeholder={`Search for a ${optionType.toLowerCase()}...`}
            value={selectedDegree}
            onChange={(option) => setSelectedDegree(option as DegreeOption)} 
        />
      )

    return (
        <div>
            <Flex className="container">
                <Flex className="header-container" align="center">
                    <h1>Add {optionType}s</h1>
                    <p className="secondary-text">
                        Search for your {optionType.toLowerCase()} and add it to Gradtrak to list specific requirements.
                    </p>
                </Flex>
                <Flex direction="column" align="start" gap="16px" width="100%">
                    <DegreeSelect/>
                    <a>Don't see your {optionType.toLowerCase()}?</a>
                    <button className="secondary" onClick={handleAddDegree}>Add</button>
                </Flex>
                <Separator size="4"/>
                <Flex direction="column" align="start" gap="16px"  width="100%">
                    <h2>Selected {optionType}s</h2>
                    {selectedDegreeList.length === 0 ? (
                        <p className="secondary-text">None Selected</p>
                    ) : (
                        <div className="selected-degree-list" id={`${optionType.toLowerCase()}s-list`}>
                            {selectedDegreeList.map((degree) => (
                                <div key={degree.value} className="degree-chip">
                                    {degree.label}
                                    <span className="delete-icon" onClick={() => handleRemoveDegree(degree)}>✕</span>
                                </div>
                            ))}
                        </div>
                    )}
                </Flex>
                <Flex gap="10px" width="100%">
                    <button className="secondary">Skip</button>
                    <button className="primary">Confirm</button>
                </Flex>
            </Flex>
        </div>
    );
}