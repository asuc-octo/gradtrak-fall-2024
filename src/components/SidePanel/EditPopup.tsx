// EditPopup.tsx
import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';
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

  // Reset form whenever the dialog opens
  React.useEffect(() => {
    setEditedName(name);
    setEditedMajors(majors.join(', '));
    setEditedMinors(minors.join(', '));
    setEditedTotalUnits(totalUnits.toString());
    setEditedTransferUnits(transferUnits.toString());
    setEditedPnpTotal(pnpTotal.toString());
  }, [isOpen, name, majors, minors, totalUnits, transferUnits, pnpTotal]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay">
          <Dialog.Content className="dialog-content">
            <Dialog.Title>Edit Graduation Plan</Dialog.Title>
            <Dialog.Description>
              Update your graduation plan details below.
            </Dialog.Description>
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="name-input">Name:</label>
                <input
                  id="name-input"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="majors-input">Majors (comma-separated):</label>
                <input
                  id="majors-input"
                  type="text"
                  value={editedMajors}
                  onChange={(e) => setEditedMajors(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="minors-input">Minors (comma-separated):</label>
                <input
                  id="minors-input"
                  type="text"
                  value={editedMinors}
                  onChange={(e) => setEditedMinors(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="total-units-input">Total Units:</label>
                <input
                  id="total-units-input"
                  type="number"
                  value={editedTotalUnits}
                  onChange={(e) => setEditedTotalUnits(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="transfer-units-input">Transfer Units:</label>
                <input
                  id="transfer-units-input"
                  type="number"
                  value={editedTransferUnits}
                  onChange={(e) => setEditedTransferUnits(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pnp-total-input">P/NP Total:</label>
                <input
                  id="pnp-total-input"
                  type="number"
                  value={editedPnpTotal}
                  onChange={(e) => setEditedPnpTotal(e.target.value)}
                />
              </div>
              {/* Save button */}
              <button type="submit">Save</button>
            </form>
            {/* Close button */}
            <Dialog.Close asChild>
              <button className="dialog-close" onClick={onClose}>
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
