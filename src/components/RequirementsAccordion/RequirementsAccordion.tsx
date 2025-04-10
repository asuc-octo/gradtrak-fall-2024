import React, { useState } from 'react';
import { Check, NavArrowDown, NavArrowRight } from 'iconoir-react';
import { Uni_Reqs, College_Reqs } from '../../lib/api';
import "./RequirementsAccordion.css";

type RequirementEnum = Uni_Reqs | College_Reqs ;

interface RequirementsAccordionProps {
    title: string;
    requirements: RequirementEnum[];
}

export default function RequirementsAccordion({ title, requirements }: RequirementsAccordionProps) {
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
                    {Object.values(requirements).map((requirement, index) => {
                        const isFulfilled = false; // TODO: Replace with `checkRequirementFulfilled` logic
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