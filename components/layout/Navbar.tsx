"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";

interface NavbarProps {
  adminName?: string;
}

export function Navbar({ adminName }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Brand Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link
          href="/admin/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#181818",
          }}
        >
          <img
            src="/globalwebify-logo.png"
            alt="GlobalWebify Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              height: "36px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.01em", color: "#181818" }}>
            Admin Portal
          </span>
        </Link>
      </div>

      {/* Right Action Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          target="_blank"
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#4A4A4A",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: "#DDF4E8",
            border: "1px solid #DDF4E8",
          }}
        >
          <span>Live Visitor Form</span>
          <ExternalLink style={{ width: "14px", height: "14px", color: "#0E9A51" }} />
        </Link>

        {adminName && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingLeft: "12px", borderLeft: "1px solid #E2E8F0" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, margin: 0, color: "#181818" }}>{adminName}</p>
              <p style={{ fontSize: "11px", color: "#4A4A4A", margin: 0 }}>Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: "transparent",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#dc2626",
              }}
            >
              <LogOut style={{ width: "14px", height: "14px" }} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
