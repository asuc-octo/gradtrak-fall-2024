import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Button } from "@radix-ui/themes";
import CustomClass from "../CustomClass/custom-class";
import "./addclass.css";
import { ClassType } from '../../types/types';

interface SearchBarProps  {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filteredClasses: ClassType[];
    handleSelectClass: (cls: ClassType) => void;
    handleOnConfirm: (cls: ClassType) => void;

};

function SearchBar({isOpen, setIsOpen, searchTerm, handleSearch, filteredClasses, handleSelectClass, handleOnConfirm}: SearchBarProps) {
    const [isCustomClassOpen, setIsCustomClassOpen] = useState(false);

    const openCustomClass = () => setIsCustomClassOpen(true);
    const closeCustomClass = () => {
      setIsOpen(false)  
      setIsCustomClassOpen(false)
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                        <Dialog.Content className="searchContent">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Type a class ID / name..."
                                className="searchBar"
                            />
                            
                            {/* Dropdown for suggestions */}
                            {(
                                <ul className="suggestion-list">
                                {filteredClasses.map((cls, index) => (
                                    <li
                                    key={`${cls.subject}-${cls.courseNumber}-${index}`}
                                    onClick={() => handleSelectClass(cls)}
                                    className="suggestion-item"
                                    >
                                    {cls.subject}{cls.courseNumber} - {cls.unitsMax} units
                                    </li>
                                ))}
                                <li key="default" className='suggestion-item'>
                                    <Button className='add-custom-btn' onClick={openCustomClass}>
                                        + Add Custom Class
                                    </Button>
                                </li>
                                </ul>
                            )}
                        </Dialog.Content>
                        <CustomClass 
                            open={isCustomClassOpen} 
                            onClose={closeCustomClass} 
                            onConfirm={handleOnConfirm}>
                        </CustomClass>
            </Dialog.Root>
    )
}

export default SearchBar;