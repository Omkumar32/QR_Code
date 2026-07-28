"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", backgroundColor: "#FFFFFF", padding: "20px" }}>
      <h2 style={{ color: "#181818", margin: "0 0 8px 0" }}>Something went wrong!</h2>
      <p style={{ color: "#4A4A4A", fontSize: "14px", margin: "0 0 20px 0" }}>{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#0E9A51",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Try Again
      </button>
    </div>
  );
}
