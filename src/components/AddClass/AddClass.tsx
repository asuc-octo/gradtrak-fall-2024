import "./addclass.css"
import { Text, Button } from "@radix-ui/themes";
import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import classesData from './../classes.json';
import SearchBar from "./SearchBar";


interface AddClassProps  {
    // name: string;
    // onEdit: () => void;
    // onDelete: (name: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addClass: (cls: ClassType) => void;
};

type ClassType = {
    id: number;
    name: string;
    units: number;
  };
  

function AddClass({ isOpen, setIsOpen, addClass }: AddClassProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filtered = classesData.filter((cls) =>
          cls.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredClasses(filtered);
      };

      const handleSelectClass = (cls: ClassType) => {
        addClass(cls); // Update parent state
        setFilteredClasses([]); // Hide suggestions
        setSearchTerm(''); // Clear search field
        setIsOpen(false); // Close dialog after selection
      };

    return (
        <div  
        >
            
            <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} searchTerm={searchTerm} 
            handleSearch={handleSearch} filteredClasses={filteredClasses}
            handleSelectClass={handleSelectClass}></SearchBar>


        </div>
    )
}

export default AddClass;