import { FeedbackDTO } from "@/types";
import * as XLSX from "xlsx";

export function formatDateString(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function exportToCSV(data: FeedbackDTO[], filename = "feedback-export.csv") {
  if (!data || data.length === 0) return;

  const headers = ["ID", "Full Name", "Email", "Phone", "Reason", "Rating", "Message", "Submission Date"];
  const rows = data.map((f) => [
    f.id,
    `"${f.name.replace(/"/g, '""')}"`,
    `"${f.email}"`,
    `"${f.phone}"`,
    `"${f.reason}"`,
    f.rating,
    `"${f.message.replace(/"/g, '""')}"`,
    `"${formatDateString(f.createdAt)}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(data: FeedbackDTO[], filename = "feedback-export.xlsx") {
  if (!data || data.length === 0) return;

  const formattedData = data.map((f) => ({
    ID: f.id,
    "Full Name": f.name,
    Email: f.email,
    Phone: f.phone,
    Reason: f.reason,
    Rating: f.rating,
    Message: f.message,
    "Submission Date": formatDateString(f.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");
  XLSX.writeFile(workbook, filename);
}
