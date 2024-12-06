
import "./custom-class.css";
import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group';

import { Xmark } from 'iconoir-react';
import RequirementDropdown from "./requirements-dropdown";
import { Button } from "@radix-ui/themes";

type CustomClassProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: (cls: { id: number; name: string; units: number }) => void;
  };

function CustomClass({open, onClose, onConfirm}: CustomClassProps) {
    const [classId, setClassId] = useState('');
    const [className, setClassName] = useState('');
    const [classUnits, setClassUnits] = useState('')

    const handleConfirm = () => {
        if (className && Number(classUnits) > 0) {
          onConfirm({ id: Number(classId), name: className, units: Number(classUnits) });
          setClassId('');
          setClassName('');
          setClassUnits('');
          onClose(); // Close the dialog
        }
      };

    return (
        <>
            <Dialog.Root open={open} onOpenChange={onClose}>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                    <Dialog.Title className="dialog-title">Add Custom Class
                    <Xmark onClick={onClose}/>
                    </Dialog.Title>
                    <div>
                        <p className="info">INFO</p>
                        <input type="text" placeholder='Add Class ID' value={classId} onChange={(e) => setClassId((e.target.value))}/>
                        <input placeholder="Add Class Title" type="text" value={className} onChange={(e) => setClassName(e.target.value)}/>
                    </div>
                    <div className="divider-line" />

                    <div>
                        <p>UNITS</p>
                        <input placeholder="Units" type="text" value={classUnits} onChange={(e) => setClassUnits((e.target.value))}/>
                    </div>
                    <div className="divider-line" />

                    <div>
                        <p>SEMESTER</p>
                        <input placeholder="Search for a semester..."/>
                    </div>
                    <div className="divider-line" />

                    <div>
                        <p>GRADING</p>
                        <RadioGroup.Root
                            className="RadioGroupRoot"
                            defaultValue="default"
                            aria-label="View density"
		                >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor="r1">
                                    Grading
                                </label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor="r2">
                                    P/NP
                                </label>
                            </div>
                        </RadioGroup.Root>
                    </div>
                    <div className="divider-line" />

                    <div>
                        <p>CREDIT</p>
                        <RadioGroup.Root
                            className="RadioGroupRoot"
                            defaultValue="default"
                            aria-label="View density"
		                >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor="r1">
                                    UC Berkeley
                                </label>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor="r2">
                                    Transfer
                                </label>
                            </div>
                        </RadioGroup.Root>
                    </div>
                    <div className="divider-line" />

                    <div>
                        <p>REQUIREMENTS FULFILLED</p>
                        <RequirementDropdown></RequirementDropdown>
                    </div>
                    <div className="divider-line" />
                    
                    {/* Dialog content goes here */}
                    
                    <Dialog.Close asChild>
                        <Button onClick={handleConfirm}>Confirm</Button>
                    {/* <button onClick={onClose} className="close-button">Close</button> */}
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

export default CustomClass;