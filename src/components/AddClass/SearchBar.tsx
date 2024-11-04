import * as Dialog from '@radix-ui/react-dialog';
import "./addclass.css"

interface SearchBarProps  {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filteredClasses: ClassType[];
    handleSelectClass: (cls: ClassType) => void;

};

type ClassType = {
    id: number;
    name: string;
    units: number;
  };

function SearchBar({isOpen, setIsOpen, searchTerm, handleSearch, filteredClasses, handleSelectClass}: SearchBarProps) {
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
                            {filteredClasses.length > 0 && (
                                <ul className="suggestion-list">
                                {filteredClasses.map((cls) => (
                                    <li
                                    key={cls.id}
                                    onClick={() => handleSelectClass(cls)}
                                    className="suggestion-item"
                                    >
                                    {cls.name} - {cls.units} units
                                    </li>
                                ))}
                                </ul>
                            )}
                        </Dialog.Content>
            </Dialog.Root>
    )
}

export default SearchBar;