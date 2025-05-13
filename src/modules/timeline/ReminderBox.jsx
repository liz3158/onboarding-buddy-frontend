import React, { useState } from "react";
import './ReminderBox.scss';

export const ReminderBox = ({ taskName, dueDate, image }) => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="reminder-dialog-overlay">
      <div className="reminder-dialog">
        <img src={image} alt="Reminder" className="reminder-img" />
        <p className="reminder-text">
          🚨 The task <strong>{taskName}</strong> is due on <strong>{dueDate}</strong> — please complete it soon!
        </p>
        <button className="reminder-confirm-btn" onClick={() => setOpen(false)}>
          ✔ Confirm & Close
        </button>
      </div>
    </div>
  );
};


{/* <ReminderBox
  taskName="Complete Week 1 Feedback Form"
  dueDate="2025-04-17"
  image="/assets/reminder-warning.png"
/> */}