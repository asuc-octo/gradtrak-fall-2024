import React, { useState } from 'react';
import { Check, NavArrowDown, NavArrowRight } from 'iconoir-react';
import { Uni_Reqs } from '../../lib/api';
import "./RequirementsAccordion.css";

interface RequirementsAccordionProps {
    title: string;
}

export default function RequirementsAccordion({ title }: RequirementsAccordionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(prev => !prev);
    };

    // TODO: Add functionality
    // TODO: Clean up code
    return (
        <div className="accordion">
            {/* Accordion header */}
            <div className="sidepanel-header-container" onClick={toggleAccordion}>
              <div className="requirement-header">{title}</div>
              {isExpanded ? (
                    <NavArrowDown className="icon" />
                ) : (
                    <NavArrowRight className="icon" />
                )}
            </div>

            {/* Conditionally rendered accordion contents */}
            {isExpanded && (
                <div className="accordion-contents">
                    {Object.values(Uni_Reqs).map((requirement, index) => {
                        const isFulfilled = true; // Replace with your `checkRequirementFulfilled` logic
                        return (
                            <div
                                key={index}
                                className={`accordion-item ${isFulfilled ? "fulfilled" : "pending"}`}
                            >
                                <div className={`icon ${isFulfilled ? "green" : ""}`}>
                                    {isFulfilled && <Check />}
                                </div>
                                <p>{requirement}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}