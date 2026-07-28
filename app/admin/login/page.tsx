"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <Link href="/" style={{ display: "inline-block", marginBottom: "12px", textDecoration: "none" }}>
            <img
              src="/globalwebify-logo.png"
              alt="GlobalWebify Logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              style={{
                height: "80px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#181818",
              margin: "0 0 4px 0",
            }}
          >
            Admin Sign In
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#4A4A4A",
              margin: 0,
            }}
          >
            Visitor Registration Management Portal
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "28px 24px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fee2e2",
                color: "#dc2626",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "18px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4A4A4A",
                  marginBottom: "6px",
                }}
              >
                Admin Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "16px",
                    width: "16px",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "40px",
                    paddingRight: "14px",
                    fontSize: "14px",
                    color: "#181818",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4A4A4A",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "16px",
                    width: "16px",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "40px",
                    paddingRight: "14px",
                    fontSize: "14px",
                    color: "#181818",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                backgroundColor: "#0E9A51",
                color: "#FFFFFF",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "6px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid #f1f5f9",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontFamily: "monospace",
              }}
            >
              Credentials: admin@feedback.com / AdminPass123!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
