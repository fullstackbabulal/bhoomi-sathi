"use client";

import React from "react";

const NotesTimeline = ({ notes = [] }) => {
  const safeNotes = Array.isArray(notes) ? notes : [];

  return (
    <div>
      <h6 className="fw-bold mb-3">Notes Timeline</h6>

      {safeNotes.length === 0 ? (
        <div className="text-muted">No notes available</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {safeNotes.map((note, index) => (
            <div
              key={note._id || index}
              className="border rounded p-3 bg-white"
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <strong>
                  {note.createdBy?.name || note.user?.name || "System"}
                </strong>

                <small className="text-muted">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleString()
                    : "-"}
                </small>
              </div>

              <p className="mb-0">
                {note.text || note.note || "No note content"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesTimeline;
