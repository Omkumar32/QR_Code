"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  FileText,
} from "lucide-react";

export function PublicFeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Indian Phone regex validation: ^[6-9]\d{9}$
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phone)) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number (starting with 6, 7, 8, or 9).");
      return;
    }

    const purposeOfVisit = reason.trim();
    if (!purposeOfVisit) {
      setErrorMessage("Please enter the purpose of your visit.");
      return;
    }

    if (typeof window !== "undefined") {
      const lastSubmitted = localStorage.getItem("feedback_submitted_at");
      if (lastSubmitted) {
        const diffMinutes = (Date.now() - parseInt(lastSubmitted, 10)) / (1000 * 60);
        if (diffMinutes < 5) {
          setErrorMessage(
            `You have already submitted your details recently. Please wait ${Math.ceil(
              5 - diffMinutes
            )} minute(s) before submitting again.`
          );
          return;
        }
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.trim(),
          phone,
          reason: purposeOfVisit,
          rating: 5,
          message: `Purpose of Visit: ${purposeOfVisit}`,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit form");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("feedback_submitted_at", Date.now().toString());
      }
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting.");
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
        }}
      >
        {/* Form Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {/* Official GlobalWebify Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
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
          </div>

          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#181818",
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            Visitor Registration Form
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#4A4A4A",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Please enter your contact details and purpose of visit.
          </p>
        </div>

        {/* Card Container */}
        {!submitted ? (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "28px 24px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            {errorMessage && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fee2e2",
                  color: "#dc2626",
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <AlertCircle style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* 1. Full Name */}
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
                  Full Name <span style={{ color: "#0E9A51" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <User
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
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0E9A51";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 154, 81, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* 2. Contact No (Phone Number) */}
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
                  Contact No (India +91) <span style={{ color: "#0E9A51" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Phone
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
                    required
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
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
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      letterSpacing: "0.025em",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0E9A51";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 154, 81, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* 3. Email Address (Optional) */}
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
                  Email Address
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
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0E9A51";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 154, 81, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* 4. Purpose of Visit */}
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
                  Purpose of Visit <span style={{ color: "#0E9A51" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <FileText
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "14px",
                      height: "16px",
                      width: "16px",
                      color: "#94a3b8",
                      pointerEvents: "none",
                    }}
                  />
                  <textarea
                    required
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "90px",
                      paddingLeft: "40px",
                      paddingRight: "14px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      fontSize: "14px",
                      color: "#181818",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                      boxSizing: "border-box",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0E9A51";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 154, 81, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
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
                  transition: "background-color 0.15s ease, opacity 0.15s ease",
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#0b7f42";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#0E9A51";
                }}
              >
                {loading ? "Submitting..." : "Submit Details"}
              </button>
            </form>
          </div>
        ) : (
          /* Thank You Screen */
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "36px 24px",
              textAlign: "center",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "56px",
                width: "56px",
                borderRadius: "50%",
                backgroundColor: "#DDF4E8",
                color: "#0E9A51",
                border: "1px solid #DDF4E8",
                margin: "0 auto 16px auto",
              }}
            >
              <CheckCircle2 style={{ width: "28px", height: "28px" }} />
            </div>

            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#181818",
                margin: "0 0 6px 0",
              }}
            >
              Entry Recorded Successfully!
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#4A4A4A",
                margin: "0 0 24px 0",
                lineHeight: 1.5,
              }}
            >
              Thank you for registering. Your visit information has been saved.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              style={{
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: "#FFFFFF",
                color: "#4A4A4A",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#DDF4E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
            >
              Submit Another Entry
            </button>
          </div>
        )}

        {/* GlobalWebify Footer Branding */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            Powered by <strong style={{ color: "#181818" }}>GlobalWebify</strong> • © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
