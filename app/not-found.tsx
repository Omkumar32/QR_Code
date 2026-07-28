import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#181818", margin: "0 0 8px 0" }}>404</h1>
      <p style={{ fontSize: "14px", color: "#4A4A4A", margin: "0 0 20px 0" }}>Page Not Found</p>
      <Link
        href="/"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#0E9A51",
          color: "#FFFFFF",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}
