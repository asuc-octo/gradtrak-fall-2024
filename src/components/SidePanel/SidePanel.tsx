import { Separator } from "@radix-ui/themes";
import RequirementsAccordion from "../RequirementsAccordion/RequirementsAccordion";
import "./SidePanel.css";

// TODO: function checkRequirementFulfilled()
  
interface SidePanelProps {
    name: string;
    majors: string[];
    minors: string[];
    totalUnits: number;
    transferUnits: number;
    pnpTotal: number;
}

export default function SidePanel({ name, majors, minors, totalUnits, transferUnits, pnpTotal}: SidePanelProps) {

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

    return (
        <div className='sidepanel'>
            {UserInfo}
            <Separator size="4" />       
            <RequirementsAccordion title={"University of California"}/>
            <Separator size="4" />     
            <RequirementsAccordion title={"Breadth Requirements"}/>
            <Separator size="4" />    
        </div>
   )
}