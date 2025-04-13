// EditPopup.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { Separator } from "@radix-ui/themes";
import React, { useState, useEffect } from 'react';
import './EditPopup.css';

interface EditPopupProps {
  isOpen: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close dialog
  name: string;
  majors: string[];
  minors: string[];
  totalUnits: number;
  transferUnits: number;
  pnpTotal: number;
  onSave: (data: {
    name: string;
    majors: string[];
    minors: string[];
    totalUnits: number;
    transferUnits: number;
    pnpTotal: number;
  }) => void;
}

export default function EditPopup({
  isOpen,
  onClose,
  name,
  majors,
  minors,
  totalUnits,
  transferUnits,
  pnpTotal,
  onSave,
}: EditPopupProps) {
  const [editedName, setEditedName] = useState(name);
  const [editedMajors, setEditedMajors] = useState(majors.join(', '));
  const [editedMinors, setEditedMinors] = useState(minors.join(', '));
  const [editedTotalUnits, setEditedTotalUnits] = useState(totalUnits.toString());
  const [editedTransferUnits, setEditedTransferUnits] = useState(transferUnits.toString());
  const [editedPnpTotal, setEditedPnpTotal] = useState(pnpTotal.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name: editedName,
      majors: editedMajors.split(',').map((m) => m.trim()).filter(Boolean),
      minors: editedMinors.split(',').map((m) => m.trim()).filter(Boolean),
      totalUnits: Number(editedTotalUnits),
      transferUnits: Number(editedTransferUnits),
      pnpTotal: Number(editedPnpTotal),
    };
    onSave(updatedData);
  };

  // Reset form whenever the dialog opens.
  useEffect(() => {
    setEditedName(name);
    setEditedMajors(majors.join(', '));
    setEditedMinors(minors.join(', '));
    setEditedTotalUnits(totalUnits.toString());
    setEditedTransferUnits(transferUnits.toString());
    setEditedPnpTotal(pnpTotal.toString());
  }, [isOpen, name, majors, minors, totalUnits, transferUnits, pnpTotal]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Edit Graduation Plan</Dialog.Title>
            <div className="Sections">
              <div className="Section">
                <div className="input-group">
                  <p className="SectionTitle">Name</p>
                  <div className="FieldContainer">
                    <input
                      id="name-input"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="FieldInput"
                    />
                  </div>
                </div>
                <div className="years-container">
                  <div className="input-group">
                    <p className="SectionTitle">Start Year</p>
                    <div className="FieldContainer">
                      <input
                        id="start-year-input"
                        type="number"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter start year"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <p className="SectionTitle">Graduation Year</p>
                    <div className="FieldContainer">
                      <input
                        id="grad-year-input"
                        type="number"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter graduation year"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <input
                    type="checkbox"
                    id="include-summer"
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <label htmlFor="include-summer">
                    Include Summer Semesters?
                  </label>
                </div>
              </div>
              <Separator size="4" />
              <div className="Section">
                <div style={{ display: "flex", gap: "30px" }}>
                  <div className="input-group">
                    <p className="SectionTitle">Major(s)</p>
                    <div className="FieldContainer">
                      <input
                        id="majors-input"
                        type="text"
                        value={editedMajors}
                        onChange={(e) => setEditedMajors(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter majors"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <p className="SectionTitle">Minor(s)</p>
                    <div className="FieldContainer">
                      <input
                        id="minors-input"
                        type="text"
                        value={editedMinors}
                        onChange={(e) => setEditedMinors(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter minors"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Separator size="4" />
              <div className="Section">
                <div style={{ display: "flex", gap: "30px" }}>
                  <div className="input-group">
                    <p className="SectionTitle">Total Units</p>
                    <div className="FieldContainer">
                      <input
                        id="total-units-input"
                        type="number"
                        value={editedTotalUnits}
                        onChange={(e) => setEditedTotalUnits(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter total units"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <p className="SectionTitle">Transfer Units</p>
                    <div className="FieldContainer">
                      <input
                        id="transfer-units-input"
                        type="number"
                        value={editedTransferUnits}
                        onChange={(e) => setEditedTransferUnits(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter transfer units"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <p className="SectionTitle">P/NP Total</p>
                    <div className="FieldContainer">
                      <input
                        id="pnp-total-input"
                        type="number"
                        value={editedPnpTotal}
                        onChange={(e) => setEditedPnpTotal(e.target.value)}
                        className="FieldInput"
                        placeholder="Enter P/NP total"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Separator size="4" />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "20px 32px" }}>
                <Dialog.Close asChild>
                  <button className="DialogClose" onClick={onClose}>
                    Close
                  </button>
                </Dialog.Close>
                <button type="submit" onClick={handleSubmit} className="ConfirmButton">
                  Save Changes
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
