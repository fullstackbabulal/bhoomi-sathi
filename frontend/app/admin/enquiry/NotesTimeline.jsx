"use client";

import React from "react";

const NotesTimeline = ({ notes = [] }) => {
  const safeNotes = Array.isArray(notes)
    ? notes
    : [];

  return (
    <div>
      <h6 className="fw-bold mb-3">
        Notes Timeline
      </h6>

      <div
        className="border rounded p-3 bg-light"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {safeNotes.length > 0 ? (
          safeNotes.map((note, index) => (
            <div
              key={index}
              className="position-relative ps-4 pb-3 mb-3 border-start border-2"
            >
              {/* Timeline Dot */}
              <span
                className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-primary"
                style={{
                  width: "12px",
                  height: "12px",
                  minWidth: "12px",
                  minHeight: "12px",
                  padding: 0,
                }}
              />

              {/* Timestamp */}
              <small className="text-muted d-block mb-1">
                {note?.createdAt
                  ? new Date(
                      note.createdAt,
                    ).toLocaleString()
                  : "Unknown date"}
              </small>

              {/* Text */}
              <div className="bg-white border rounded p-2 shadow-sm">
                {note?.text ||
                  "No note content"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted">
            No notes available
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesTimeline;