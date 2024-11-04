import React, { useState } from 'react';
import "@radix-ui/themes/styles.css";
import "./setup.css"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import YearsData from './years.json';

function YearDropdown() {
  const [gradYear, setGradYear] = useState<string | null>(null);
	const { years } = YearsData;

	const handleGradSelect = (year: string) => {
		setGradYear(year);
	  };

    return (
        <DropdownMenu.Root>
		<DropdownMenu.Trigger className='gradYearbox'>
		{gradYear ? gradYear : 'Select year'}
        <ChevronDownIcon />
		</DropdownMenu.Trigger>

		<DropdownMenu.Portal>
        
		<DropdownMenu.Content className="gradOptionsBox">
          {years.map((year) => (
            <DropdownMenu.Item
              key={year}
              onSelect={() => handleGradSelect(year)}
              className="yearOptions"
            >
              {year}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
		</DropdownMenu.Portal>
	  </DropdownMenu.Root>
    )
}

export default YearDropdown;