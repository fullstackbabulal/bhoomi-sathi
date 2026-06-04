"use client";

import React, { useState } from "react";

import EnquiryDetailsModal from "@/components/admin/enquiry/EnquiryDetailsModal";

const statusClasses = {
  new: "bg-primary",
  contacted: "bg-warning text-dark",
  visited: "bg-info text-dark",
  closed: "bg-success",
  rejected: "bg-danger",
};

const EnquiryTable = ({
  enquiries = [],
  onRefresh,
}) => {
  // ===============================
  // STATE
  // ===============================
  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  // ===============================
  // SAFE DATA
  // ===============================
  const safeEnquiries =
    Array.isArray(enquiries)
      ? enquiries
      : [];

  // ===============================
  // HANDLERS
  // ===============================
  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEnquiry(null);
  };

  const handleUpdated = () => {
    onRefresh?.();
    handleCloseModal();
  };

  return (
    <>
      {/* =============================== */}
      {/* TABLE */}
      {/* =============================== */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Lead</th>
              <th>Phone</th>
              <th>Property</th>
              <th>Source</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {safeEnquiries.length > 0 ? (
              safeEnquiries.map(
                (enquiry, index) => (
                  <tr key={enquiry._id}>
                    {/* Serial */}
                    <td>{index + 1}</td>

                    {/* Lead */}
                    <td>
                      <div className="fw-semibold">
                        {enquiry.name ||
                          "N/A"}
                      </div>

                      {enquiry.email && (
                        <small className="text-muted">
                          {
                            enquiry.email
                          }
                        </small>
                      )}
                    </td>

                    {/* Phone */}
                    <td>
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="text-decoration-none"
                      >
                        {enquiry.phone ||
                          "-"}
                      </a>
                    </td>

                    {/* Property */}
                    <td>
                      {enquiry.property
                        ?.title ? (
                        <div>
                          <div className="fw-semibold">
                            {
                              enquiry
                                .property
                                .title
                            }
                          </div>

                          {enquiry
                            .property
                            ?.location && (
                            <small className="text-muted">
                              {
                                enquiry
                                  .property
                                  .location
                              }
                            </small>
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Source */}
                    <td>
                      <span className="text-capitalize">
                        {enquiry.source ||
                          "website"}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          statusClasses[
                            enquiry
                              .status
                          ] ||
                          "bg-secondary"
                        }`}
                      >
                        {enquiry.status ||
                          "new"}
                      </span>
                    </td>

                    {/* Assigned */}
                    <td>
                      {enquiry
                        .assignedTo
                        ?.name || (
                        <span className="text-muted">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Created */}
                    <td>
                      {enquiry.createdAt
                        ? new Date(
                            enquiry.createdAt,
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        {/* Call */}
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="btn btn-sm btn-outline-success"
                        >
                          Call
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/91${enquiry.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-success"
                        >
                          WhatsApp
                        </a>

                        {/* View */}
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            handleView(
                              enquiry,
                            )
                          }
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-5"
                >
                  <div className="text-muted">
                    No enquiries found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =============================== */}
      {/* DETAILS MODAL */}
      {/* =============================== */}
      <EnquiryDetailsModal
        enquiry={selectedEnquiry}
        show={showModal}
        onClose={handleCloseModal}
        onUpdated={handleUpdated}
      />
    </>
  );
};

export default EnquiryTable;