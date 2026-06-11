"use client";

import { useEffect, useState, useCallback } from "react";
import API from "@/utils/api";

import EnquiryTable from "@/components/admin/enquiry/EnquiryTable";
import EnquiryFilters from "@/components/admin/enquiry/EnquiryFilters";

interface Enquiry {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  status?: string;
  source?: string;
  createdAt?: string;

  property?: {
    _id?: string;
    title?: string;
    location?: string;
  };

  assignedTo?: {
    _id?: string;
    name?: string;
  };
}

export default function AdminEnquiriesPage() {
  // ===============================
  // STATE
  // ===============================
  const [enquiries, setEnquiries] = useState<Enquiry[]>(
    [],
  );

  const [loading, setLoading] =
    useState<boolean>(true);

  // ===============================
  // FILTERS
  // ===============================
  const [search, setSearch] =
    useState<string>("");

  const [status, setStatus] =
    useState<string>("");

  const [source, setSource] =
    useState<string>("");

  // ===============================
  // PAGINATION
  // ===============================
  const [page, setPage] =
    useState<number>(1);

  const limit = 10;

  // ===============================
  // FETCH ENQUIRIES
  // ===============================
  const fetchEnquiries = useCallback(
    async () => {
      try {
        setLoading(true);

        const res = await API.get(
          "/enquiries",
          {
            params: {
              page,
              limit,
              search,
              status,
              source,
            },
          },
        );

        const data = res?.data;

        // Safe extraction
        if (Array.isArray(data?.data)) {
          setEnquiries(data.data);
        } else if (
          Array.isArray(data?.enquiries)
        ) {
          setEnquiries(data.enquiries);
        } else if (Array.isArray(data)) {
          setEnquiries(data);
        } else {
          setEnquiries([]);
        }
      } catch (error) {
        console.error(
          "Error fetching enquiries:",
          error,
        );

        setEnquiries([]);
      } finally {
        setLoading(false);
      }
    },
    [page, search, status, source],
  );

  // ===============================
  // EFFECT
  // ===============================
  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
    <div className="container-fluid py-4">
      {/* =============================== */}
      {/* PAGE HEADER */}
      {/* =============================== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Enquiry Dashboard
          </h2>

          <p className="text-muted mb-0">
            Manage customer enquiries and leads
          </p>
        </div>
      </div>

      {/* =============================== */}
      {/* FILTERS */}
      {/* =============================== */}
      <EnquiryFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        setPage={setPage}
      />

      {/* =============================== */}
      {/* TABLE */}
      {/* =============================== */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

              <p className="mt-3 text-muted">
                Loading enquiries...
              </p>
            </div>
          ) : (
            <EnquiryTable
            enquiries={enquiries}
            onRefresh={fetchEnquiries}
            />
          )}
        </div>
      </div>

      {/* =============================== */}
      {/* PAGINATION */}
      {/* =============================== */}
      <div className="d-flex justify-content-end mt-4 gap-2">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1),
            )
          }
        >
          Previous
        </button>

        <button className="btn btn-primary">
          Page {page}
        </button>

        <button
          className="btn btn-outline-primary"
          disabled={
            enquiries.length < limit
          }
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}