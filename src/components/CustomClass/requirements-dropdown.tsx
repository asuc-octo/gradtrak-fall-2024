import React, { useState } from 'react';
import "@radix-ui/themes/styles.css";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';



function RequirementDropdown() {
    const [reqFulfilled, setReqFufilled] = useState<string | null>(null);

    const handleReqSelect = (req: string) => {
		setReqFufilled(req);
	  };
    return (
      <DropdownMenu.Root>
          <DropdownMenu.Trigger className='reqBox'>
          {reqFulfilled ? reqFulfilled : 'Select a requirement...'}
              <ChevronDownIcon />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="reqOptionsBox">
                  
                    <DropdownMenu.Item 
                    className="reqOptions"
                    onSelect={() => handleReqSelect("check")}>
                      Check 
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                    className="reqOptions"
                    onSelect={() => handleReqSelect("check2")}>
                      Check2
                    </DropdownMenu.Item>
                  
              </DropdownMenu.Content>
          </DropdownMenu.Portal>
	    </DropdownMenu.Root>
    )
}

export default RequirementDropdown;