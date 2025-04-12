// SidePanel.tsx
import { Separator } from "@radix-ui/themes";
import RequirementsAccordion from "../RequirementsAccordion/RequirementsAccordion";
import "./SidePanel.css";
import { Uni_Reqs, College_Reqs } from '../../lib/api';

interface SidePanelProps {
  name: string;
  majors: string[];
  minors: string[];
  totalUnits: number;
  transferUnits: number;
  pnpTotal: number;
  onUpdateUser: (updatedData: {
    name: string;
    majors: string[];
    minors: string[];
    totalUnits: number;
    transferUnits: number;
    pnpTotal: number;
  }) => void;
  onEditClick: () => void;
}

export default function SidePanel({
  name,
  majors,
  minors,
  totalUnits,
  transferUnits,
  pnpTotal,
  onUpdateUser,
  onEditClick,
}: SidePanelProps) {

  const UserInfo = (
    <div className="sidepanel-container">
      <div className="sidepanel-header-container">
        <div className="user-header">
          <h2 className="truncate">{name}</h2>
          <h2 className="secondary-text">Graduation Plan</h2>
        </div>
        {/* Just a button that triggers opening the EditPopup in SemesterHome. */}
        <button className="panel-secondary" onClick={onEditClick}>
          Edit
        </button>
      </div>
      <div className="user-info-grid">
        <div className="label">Major(s)</div>
        <div className="value">
          <ul>
            {majors.map((major, index) => (
              <li key={index}>{major}</li>
            ))}
          </ul>
        </div>
        {minors.length > 0 && (
          <>
            <div className="label">Minor(s)</div>
            <div className="value">
              <ul>
                {minors.map((minor, index) => (
                  <li key={index}>{minor}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        <div className="label">Total Units</div>
        <div className="value">{totalUnits}</div>
        <div className="label">Transfer Units</div>
        <div className="value">{transferUnits}</div>
        <div className="label">P/NP Total</div>
        <div className="value">{pnpTotal}</div>
      </div>
    </div>
  );

  const MajorRequirements = (
    <div>
      {majors.map((major, index) => (
        <div key={index}>
          <div className="sidepanel-container accordion">
            <div className="sidepanel-header-container">
              <div className="user-header">
                <h2 className="truncate">{major}</h2>
              </div>
            </div>
            <div className="accordion-contents">
              <div className="accordion-item">
                <p className="units-title">Upper Division Units:</p>
                <p className="units-comp">0/8</p>
              </div>
              <div className="accordion-item">
                <p className="units-title">Lower Division Units:</p>
                <p className="units-comp">0/8</p>
              </div>
              <div className="accordion-item">
                <p className="units-title">Elective Units:</p>
                <p className="units-comp">0/7</p>
              </div>
            </div>
          </div>
          <Separator size="4" />
        </div>
      ))}
    </div>
  );

  const MinorRequirements = (
    <div>
      {minors.map((minor, index) => (
        <div key={index}>
          <div className="sidepanel-container accordion">
            <div className="sidepanel-header-container">
              <div className="user-header">
                <h2 className="truncate">{minor}</h2>
              </div>
            </div>
            <div className="accordion-contents">
              <div className="accordion-item">
                <p className="units-title">Upper Division Units:</p>
                <p className="units-comp">0/8</p>
              </div>
              <div className="accordion-item">
                <p className="units-title">Lower Division Units:</p>
                <p className="units-comp">0/8</p>
              </div>
              <div className="accordion-item">
                <p className="units-title">Elective Units:</p>
                <p className="units-comp">0/7</p>
              </div>
            </div>
          </div>
          <Separator size="4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="sidepanel">
      {UserInfo}
      <Separator size="4" />
      {MajorRequirements}
      {MinorRequirements}
      <RequirementsAccordion
        title="University of California"
        requirements={[
          Uni_Reqs.AC,
          Uni_Reqs.AH,
          Uni_Reqs.AI,
          Uni_Reqs.CW,
          Uni_Reqs.QR,
          Uni_Reqs.RCA,
          Uni_Reqs.RCB,
          Uni_Reqs.FL,
        ]}
      />
      <Separator size="4" />
      <RequirementsAccordion
        title="Breadth Requirements"
        requirements={[
          College_Reqs.LnS_AL,
          College_Reqs.LnS_BS,
          College_Reqs.LnS_HS,
          College_Reqs.LnS_IS,
          College_Reqs.LnS_PV,
          College_Reqs.LnS_PS,
          College_Reqs.LnS_SBS,
        ]}
      />
      <Separator size="4" />
    </div>
  );
}
