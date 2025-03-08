import "./addclass.css"
import React, {useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import { ClassType } from '../../types/types';
import { useQuery } from '@apollo/client';
import { GET_COURSES, GetCoursesResponse } from '../../lib/api/classes';

interface AddClassProps  {
    // name: string;
    // onEdit: () => void;
    // onDelete: (name: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addClass: (cls: ClassType) => void;
    handleOnConfirm: (cls: ClassType) => void;
};

function AddClass({ isOpen, setIsOpen, addClass, handleOnConfirm }: AddClassProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);
    const [allClasses, setAllClasses] = useState<ClassType[]>([]);

    const { data } = useQuery<GetCoursesResponse>(GET_COURSES, {
        variables: {
            year: 2025,
            semester: "Spring"
        }
    });

    useEffect(() => {
        console.log('Data:', data);
        if (data?.catalog) {
            console.log('Raw catalog item:', data.catalog[0]);
            const formattedClasses = data.catalog.map(item => ({
                subject: item.course.subject,
                courseNumber: item.course.number,
                unitsMax: 0
            }));
            console.log('Formatted classes:', formattedClasses);
            setAllClasses(formattedClasses);
        }
    }, [data]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase().replace(/\s+/g, '');
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredClasses([]);
            return;
        }

        const filtered = allClasses.filter((course) => {
            const searchString = `${course.subject}${course.courseNumber}`.toLowerCase().replace(/\s+/g, '');
            return searchString.includes(term);
        });

        setFilteredClasses(filtered);
    };

    const handleSelectClass = (cls: ClassType) => {
        addClass(cls); // Update parent state
        setFilteredClasses([]); // Hide suggestions
        setSearchTerm(''); // Clear search field
        setIsOpen(false); // Close dialog after selection
      };

    return (
        <div>
            <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} searchTerm={searchTerm} 
            handleSearch={handleSearch} filteredClasses={filteredClasses}
            handleSelectClass={handleSelectClass} handleOnConfirm={handleOnConfirm}></SearchBar>
        </div>
    )
}

export default AddClass;