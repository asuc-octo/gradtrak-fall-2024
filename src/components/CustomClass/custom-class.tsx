
import "./custom-class.css";
import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Separator } from "@radix-ui/themes";
import PinIcon from '@mui/icons-material/PinOutlined';
import TagIcon from '@mui/icons-material/Tag';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LibBooksIcon from '@mui/icons-material/LibraryBooksOutlined'

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
                    <Dialog.Title className="dialog-title">Add Custom Class<Xmark onClick={onClose}/></Dialog.Title>
                    <div className="sections">
                        <p className="info">INFO</p>
                        <div className="s1">
                            <PinIcon className="pinIcon" style={{fill: '#8A8A8A', width: '16px', height: '16px'}}/>
                            <input type="text" placeholder='Add Class ID' value={classId} onChange={(e) => setClassId((e.target.value))} />
                        </div>
                        <div className="s1">
                            <LibBooksIcon style={{fill: '#8A8A8A', width: '16px', height: '16px'}}/>
                            <input placeholder="Add Class Title" type="text" value={className} onChange={(e) => setClassName(e.target.value)}/>
                        </div>
                    </div>
                    <Separator size="4" className="separate"/>

                    <div className="sections">
                        <p className="info">UNITS</p>
                        <div className="s1">
                            <TagIcon style={{fill: '#8A8A8A', width: '16px', height: '16px'}}/>
                            <input placeholder="Units" type="text" value={classUnits} onChange={(e) => setClassUnits((e.target.value))}/>
                        </div>
                    </div>
                    <Separator size="4" className="separate"/>

                    <div className="sections">
                        <p className="info">SEMESTER</p>
                        <div className="s1">
                            <CalendarIcon style={{fill: '#8A8A8A', width: '16px', height: '16px'}} />
                            <input placeholder="Search for a semester..."/>
                        </div>
                    </div>
                    <Separator size="4" className="separate"/>

                    <div className="sections">
                        <p className="info">GRADING</p>
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
                    <Separator size="4" className="separate"/>

                    <div className="sections">
                        <p className="info">CREDIT</p>
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
                    <Separator size="4" className="separate"/>

                    <div className="sections">
                        <div className="reqDropdown">
                            <p className="info">REQUIREMENTS FULFILLED</p>
                                <RequirementDropdown></RequirementDropdown>
                            </div>
                    </div>
                    <Separator size="4" className="separate"/>

                    <Dialog.Close asChild>
                        <div className="dialogFooter">
                            <Button onClick={handleConfirm} className="confirmBtn">Confirm</Button>
                        </div>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

export default CustomClass;