import React, { useState } from 'react';
import { Check, NavArrowDown, NavArrowRight } from 'iconoir-react';
import { Uni_Reqs } from '../../lib/api';
import "./RequirementsAccordion.css";

interface RequirementsAccordionProps {
    title: string;
    requirements?: Uni_Reqs[];
}

export default function RequirementsAccordion({ title, requirements }: RequirementsAccordionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [fulfilledRequirements, setFulfilledRequirements] = useState<Set<Uni_Reqs>>(new Set());
    const [hoveredRequirement, setHoveredRequirement] = useState<Uni_Reqs | null>(null);
    const [activeMenuRequirement, setActiveMenuRequirement] = useState<Uni_Reqs | null>(null);

    const toggleAccordion = () => {
        setIsExpanded(prev => !prev);
    };

    const handleMouseEnter = (requirement: Uni_Reqs) => {
        setHoveredRequirement(requirement);
    };

    const handleMouseLeave = () => {
        setHoveredRequirement(null);
    };

    const openMenu = (requirement: Uni_Reqs) => {
        setActiveMenuRequirement(requirement);
    };

    const closeMenu = () => {
        setActiveMenuRequirement(null);
    };

    const markAsFulfilled = (requirement: Uni_Reqs) => {
        const newFulfilledRequirements = new Set(fulfilledRequirements);
        newFulfilledRequirements.add(requirement);
        setFulfilledRequirements(newFulfilledRequirements);
        closeMenu();
    };

    const markAsUnfulfilled = (requirement: Uni_Reqs) => {
        const newFulfilledRequirements = new Set(fulfilledRequirements);
        newFulfilledRequirements.delete(requirement);
        setFulfilledRequirements(newFulfilledRequirements);
        closeMenu();
    };

    return (
        <div className="accordion">
            <div className="sidepanel-header-container" onClick={toggleAccordion}>
                <div className="requirement-header">{title}</div>
                {isExpanded ? <NavArrowDown className="icon" /> : <NavArrowRight className="icon" />}
            </div>
            {isExpanded && requirements && (
                <div className="accordion-contents">
                    {requirements.map((requirement, index) => (
                        <div
                            key={index}
                            className={`accordion-item`}
                            onMouseEnter={() => handleMouseEnter(requirement)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="item-start">
                                {fulfilledRequirements.has(requirement) && <Check className="checkmark-icon" />}
                                <p className="requirement-text">{requirement}</p>
                            </div>
                            <span
                                className="ellipsis"
                                onClick={() => openMenu(requirement)}
                                style={{ visibility: hoveredRequirement === requirement && activeMenuRequirement !== requirement ? 'visible' : 'hidden' }}
                            >
                                ...
                            </span>
                            {activeMenuRequirement === requirement && (
                                <div className="requirement-menu">
                                    {fulfilledRequirements.has(requirement) ? (
                                        <button onClick={() => markAsUnfulfilled(requirement)}>Mark as Unfulfilled</button>
                                    ) : (
                                        <button onClick={() => markAsFulfilled(requirement)}>Mark as Fulfilled</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {!requirements && <p>No requirements listed.</p>}
                </div>
            )}
        </div>
    );
}