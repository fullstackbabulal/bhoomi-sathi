"use client";

import React, {
  useEffect,
  useState,
} from "react";

import API from "@/utils/api";
import NotesTimeline from "@/components/admin/enquiry/NotesTimeline";

const statusOptions = [
  "new",
  "contacted",
  "visited",
  "closed",
  "rejected",
];

const EnquiryDetailsModal = ({
  enquiry,
  show,
  onClose,
  onUpdated,
}) => {
  // ===============================
  // STATE
  // ===============================
  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("new");

  const [note, setNote] =
    useState("");

  const [followUpDate, setFollowUpDate] =
    useState("");

  // ===============================
  // RESET STATE WHEN ENQUIRY CHANGES
  // ===============================
  useEffect(() => {
    if (enquiry) {
      setStatus(
        enquiry.status || "new",
      );

      setFollowUpDate(
        enquiry.followUpDate
          ? enquiry.followUpDate.slice(
              0,
              10,
            )
          : "",
      );
    }
  }, [enquiry]);

  // ===============================
  // GUARD
  // ===============================
  if (!show || !enquiry)
    return null;

  // ===============================
  // UPDATE STATUS
  // ===============================
  const handleStatusUpdate =
    async () => {
      try {
        setLoading(true);

        await API.put(
          `/enquiries/${enquiry._id}`,
          {
            status,
            followUpDate,
          },
        );

        onUpdated?.();
      } catch (error) {
        console.error(
          "Failed to update enquiry:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

  // ===============================
  // ADD NOTE
  // ===============================
  const handleAddNote =
    async () => {
      if (!note.trim()) return;

      try {
        setLoading(true);

        await API.post(
          `/enquiries/${enquiry._id}/notes`,
          {
            text: note,
          },
        );

        setNote("");

        onUpdated?.();
      } catch (error) {
        console.error(
          "Failed to add note:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background:
          "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          {/* =============================== */}
          {/* HEADER */}
          {/* =============================== */}
          <div className="modal-header">
            <div>
              <h5 className="modal-title">
                Enquiry Details
              </h5>

              <small className="text-muted">
                Lead management panel
              </small>
            </div>

            <button
              className="btn-close"
              onClick={onClose}
            />
          </div>

          {/* =============================== */}
          {/* BODY */}
          {/* =============================== */}
          <div className="modal-body">
            <div className="row g-4">
              {/* =============================== */}
              {/* LEFT COLUMN */}
              {/* =============================== */}
              <div className="col-md-6">
                {/* Customer Info */}
                <div className="card border-0 bg-light p-3">
                  <h6 className="fw-bold mb-3">
                    Customer Information
                  </h6>

                  <p>
                    <strong>
                      Name:
                    </strong>{" "}
                    {enquiry.name ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Phone:
                    </strong>{" "}
                    <a
                      href={`tel:${enquiry.phone}`}
                    >
                      {enquiry.phone ||
                        "-"}
                    </a>
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>{" "}
                    {enquiry.email ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Message:
                    </strong>

                    <br />

                    {enquiry.message ||
                      "No message"}
                  </p>
                </div>

                {/* Property Info */}
                <div className="card border-0 bg-light p-3 mt-3">
                  <h6 className="fw-bold mb-3">
                    Property Details
                  </h6>

                  <p>
                    <strong>
                      Title:
                    </strong>{" "}
                    {enquiry.property
                      ?.title || "-"}
                  </p>

                  <p>
                    <strong>
                      Location:
                    </strong>{" "}
                    {enquiry.property
                      ?.location ||
                      "-"}
                  </p>
                </div>
              </div>

              {/* =============================== */}
              {/* RIGHT COLUMN */}
              {/* =============================== */}
              <div className="col-md-6">
                {/* Lead Management */}
                <div className="card border-0 bg-light p-3">
                  <h6 className="fw-bold mb-3">
                    Lead Management
                  </h6>

                  {/* Status */}
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select mb-3"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value,
                      )
                    }
                  >
                    {statusOptions.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ),
                    )}
                  </select>

                  {/* Follow-up Date */}
                  <label className="form-label">
                    Follow-up Date
                  </label>

                  <input
                    type="date"
                    className="form-control mb-3"
                    value={
                      followUpDate
                    }
                    onChange={(e) =>
                      setFollowUpDate(
                        e.target.value,
                      )
                    }
                  />

                  <button
                    className="btn btn-primary w-100"
                    disabled={
                      loading
                    }
                    onClick={
                      handleStatusUpdate
                    }
                  >
                    {loading
                      ? "Updating..."
                      : "Update Lead"}
                  </button>
                </div>

                {/* Notes */}
                <div className="card border-0 bg-light p-3 mt-3">
                  <NotesTimeline
                    notes={
                      enquiry?.notes
                    }
                  />

                  <textarea
                    className="form-control mt-3"
                    rows="3"
                    placeholder="Write note..."
                    value={note}
                    onChange={(e) =>
                      setNote(
                        e.target.value,
                      )
                    }
                  />

                  <button
                    className="btn btn-outline-primary mt-2"
                    disabled={
                      loading
                    }
                    onClick={
                      handleAddNote
                    }
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =============================== */}
          {/* FOOTER */}
          {/* =============================== */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetailsModal;