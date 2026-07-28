"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "50px", backgroundColor: "#FFFFFF" }}>
        <h2 style={{ color: "#181818" }}>Application Error</h2>
        <p style={{ color: "#4A4A4A", fontSize: "14px" }}>{error?.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "16px",
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
      </body>
    </html>
  );
}
