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
    const [showMenu, setShowMenu] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);
    const [units, setUnits] = useState<number | null>(null);

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
        // onMouseEnter={() => setShowMenu(true)} 
        // onMouseLeave={() => setShowMenu(false)}
        >
            {showMenu && 
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                    <Button className="dropDownBtn">
                        <DotsHorizontalIcon className="" />
                    </Button>
                    </DropdownMenu.Trigger>

                    {/* Dropdown Menu Content */}
                    <DropdownMenu.Content
                    className="bg-white shadow-lg rounded-md p-1 border border-gray-200"
                    sideOffset={5}
                    align="end"
                    >
                    <DropdownMenu.Item
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                        // onClick={onEdit}
                    >
                        Edit Course Details
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                        // onClick={() => onDelete(name)}
                    >
                        Delete Class
                    </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            }
            
            <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} searchTerm={searchTerm} 
            handleSearch={handleSearch} filteredClasses={filteredClasses}
            handleSelectClass={handleSelectClass}></SearchBar>


        </div>
    )
}

export default AddClass;