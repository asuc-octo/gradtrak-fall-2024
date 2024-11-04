import { Separator } from "@radix-ui/themes";
import { RequirementCategory } from "./types"
import { Check, NavArrowDown } from 'iconoir-react'
import "./SidePanel.css";

interface SidePanelProps {
    name: string;
    majors: string[];
    minors: string[];
    totalUnits: number;
    transferUnits: number;
    pnpTotal: number;
    requirements: RequirementCategory;
}

export default function SidePanel({ name, majors, minors, totalUnits, transferUnits, pnpTotal, requirements}: SidePanelProps) {
    const UserInfo = (
        <div className="sidepanel-container">
            <div className="sidepanel-header-container">
                <div className="user-header">
                    <h2 className="truncate">{name}</h2>
                    <h2 className="secondary-text">Graduation Plan</h2>
                </div>
                <button className="secondary">Edit</button>
            </div>
            <div className="user-info-grid">
                {/* Majors */}
                <div className="label">Major(s)</div>
                <div className="value">
                    <ul>{majors.map((major, index) => (<li key={index}>{major}</li>))}</ul>
                </div>

                {/* Minors */}
                {minors.length > 0 && (
                    <>
                        <div className="label">Minor(s)</div>
                        <div className="value">
                            <ul>{minors.map((minor, index) => (<li key={index}>{minor}</li>))}</ul>
                        </div>
                    </>
                )}

                {/* Total Units */}
                <div className="label">Total Units</div>
                <div className="value">{totalUnits}</div>

                {/* Transfer Units */}
                <div className="label">Transfer Units</div>
                <div className="value">{transferUnits}</div>

                 {/* P/NP Total */}
                <div className="label">P/NP Total</div>
                <div className="value">{pnpTotal}</div>
            </div>       
        </div>
    );

    // TODO: Add functionality
    const Requirement = (
        <div className="sidepanel-container accordion">
            <div className="sidepanel-header-container">
                <div className="requirement-header">
                    University of California
                </div>
                <NavArrowDown className="icon"/>
            </div>
            <div className="accordion-contents">
                <div className="accordion-item ">
                    <div className="icon green"> <Check /> </div>
                    <p>Entry-Level Writing</p>
                </div>
                <div className="accordion-item ">
                    <div className="icon green"> <Check /> </div>
                    <p>American History</p>
                </div>
                <div className="accordion-item ">
                    <div className="icon green"></div>
                    <p>American Institutions</p>
                </div>
                <div className="accordion-item ">
                    <div className="icon green"> </div>
                    <p>American Cultures</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className='sidepanel'>
            {UserInfo}
            <Separator size="4" />       
            {Requirement}
            <Separator size="4" />  
            {Requirement}
            <Separator size="4" />  
            {Requirement}
            <Separator size="4" />  
            {Requirement}
            <Separator size="4" />  
            {Requirement}
            <Separator size="4" />  
            {Requirement}
            <Separator size="4" />    
        </div>
   )
}