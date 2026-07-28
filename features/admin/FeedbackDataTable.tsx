"use client";

import React, { useState } from "react";
import { FeedbackDTO } from "@/types";
import {
  Search,
  Download,
  FileSpreadsheet,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { exportToCSV, exportToExcel, formatDateString } from "@/lib/export";

interface FeedbackDataTableProps {
  initialFeedbacks: FeedbackDTO[];
}

export function FeedbackDataTable({ initialFeedbacks }: FeedbackDataTableProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackDTO[]>(initialFeedbacks);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtering Logic
  const filteredFeedbacks = feedbacks.filter((f) => {
    return (
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.phone.includes(searchTerm) ||
      f.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage) || 1;
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this visitor record?")) return;

    try {
      const res = await fetch("/api/feedback/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setFeedbacks((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Table Action Bar */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Visitor Registration Records</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: "#f1f5f9",
                color: "#475569",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              {filteredFeedbacks.length} Total
            </span>
          </h2>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            Search, filter, paginate, delete, and export visitor records.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => exportToCSV(filteredFeedbacks)}
            style={{
              padding: "7px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Download style={{ width: "14px", height: "14px" }} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => exportToExcel(filteredFeedbacks)}
            style={{
              padding: "7px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "#059669",
              border: "1px solid #a7f3d0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FileSpreadsheet style={{ width: "14px", height: "14px" }} />
            <span>Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div
        style={{
          padding: "14px 24px",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ position: "relative", maxWidth: "360px" }}>
          <Search
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "15px",
              width: "15px",
              color: "#94a3b8",
              pointerEvents: "none",
            }}
          />
          <input
            placeholder="Search visitor name, phone, email, purpose..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              height: "36px",
              paddingLeft: "36px",
              paddingRight: "12px",
              fontSize: "13px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              outline: "none",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "12px 24px" }}>Visitor Details</th>
              <th style={{ padding: "12px 24px" }}>Purpose of Visit</th>
              <th style={{ padding: "12px 24px" }}>Registration Date</th>
              <th style={{ padding: "12px 24px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFeedbacks.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "#64748b" }}>
                  No visitor records matching your search.
                </td>
              </tr>
            ) : (
              paginatedFeedbacks.map((f) => (
                <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 24px" }}>
                    <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 2px 0" }}>{f.name}</p>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 2px 0" }}>{f.email}</p>
                    <p style={{ fontSize: "12px", color: "#2563eb", fontFamily: "monospace", margin: 0 }}>+91 {f.phone}</p>
                  </td>
                  <td style={{ padding: "14px 24px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}
                    >
                      {f.reason}
                    </span>
                  </td>
                  <td style={{ padding: "14px 24px", color: "#64748b", whiteSpace: "nowrap" }} suppressHydrationWarning>
                    {formatDateString(f.createdAt)}
                  </td>
                  <td style={{ padding: "14px 24px", textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(f.id)}
                      title="Delete Record"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    >
                      <Trash2 style={{ width: "16px", height: "16px" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        <span>
          Showing Page {currentPage} of {totalPages} ({filteredFeedbacks.length} items)
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: currentPage === 1 ? "#94a3b8" : "#334155",
              border: "1px solid #cbd5e1",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ChevronLeft style={{ width: "14px", height: "14px" }} />
            <span>Previous</span>
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: currentPage >= totalPages ? "#94a3b8" : "#334155",
              border: "1px solid #cbd5e1",
              cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>Next</span>
            <ChevronRight style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
