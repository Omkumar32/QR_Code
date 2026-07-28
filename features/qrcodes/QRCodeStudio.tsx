"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Download, Printer, Copy } from "lucide-react";

export function QRCodeStudio() {
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [qrColor, setQrColor] = useState<string>("#0E9A51");
  const [previewDataUrl, setPreviewDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qr-code-beta-bice.vercel.app";
    setTargetUrl(`${appUrl}/feedback`);
  }, []);

  useEffect(() => {
    if (targetUrl) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: { dark: qrColor, light: "#FFFFFF" },
      }).then(setPreviewDataUrl);
    }
  }, [targetUrl, qrColor]);

  const downloadPNG = () => {
    if (!previewDataUrl) return;
    const link = document.createElement("a");
    link.href = previewDataUrl;
    link.download = "globalwebify-visitor-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSVG = async () => {
    if (!targetUrl) return;
    const svgString = await QRCode.toString(targetUrl, {
      type: "svg",
      color: { dark: qrColor, light: "#FFFFFF" },
    });
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "globalwebify-visitor-qr.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. Customizer Settings Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #E2E8F0", paddingBottom: "14px" }}>
          <div
            style={{
              height: "36px",
              width: "36px",
              borderRadius: "8px",
              backgroundColor: "#DDF4E8",
              color: "#0E9A51",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCode style={{ width: "18px", height: "18px" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#181818", margin: 0 }}>
              QR Code Settings
            </h2>
            <p style={{ fontSize: "12px", color: "#4A4A4A", margin: 0 }}>Customize destination and colors</p>
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
            Target Registration URL
          </label>
          <input
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "12px",
              paddingRight: "12px",
              fontSize: "13px",
              color: "#181818",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              outline: "none",
              backgroundColor: "#FFFFFF",
              fontFamily: "monospace",
              boxSizing: "border-box",
            }}
          />
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
            QR Foreground Color
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              style={{
                height: "38px",
                width: "48px",
                borderRadius: "6px",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            />
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#181818", fontWeight: 600 }}>
              {qrColor}
            </span>
          </div>
        </div>

        <button
          onClick={copyLink}
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            backgroundColor: "#FFFFFF",
            color: "#4A4A4A",
            border: "1px solid #E2E8F0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <Copy style={{ width: "15px", height: "15px" }} />
          <span>{copied ? "Link Copied!" : "Copy Target URL"}</span>
        </button>
      </div>

      {/* 2. Interactive Printable Poster Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Poster Studio Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#181818", margin: "0 0 2px 0" }}>
              Printable Poster & Export Studio
            </h2>
            <p style={{ fontSize: "12px", color: "#4A4A4A", margin: 0 }}>
              Download PNG, vector SVG, or print high-density posters.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={downloadPNG}
              style={{
                padding: "7px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: "#FFFFFF",
                color: "#4A4A4A",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Download style={{ width: "14px", height: "14px" }} />
              <span>PNG</span>
            </button>

            <button
              onClick={downloadSVG}
              style={{
                padding: "7px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: "#FFFFFF",
                color: "#4A4A4A",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Download style={{ width: "14px", height: "14px" }} />
              <span>SVG</span>
            </button>

            <button
              onClick={() => window.print()}
              style={{
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: "#0E9A51",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Printer style={{ width: "14px", height: "14px" }} />
              <span>Print Poster</span>
            </button>
          </div>
        </div>

        {/* Poster Canvas Preview */}
        <div style={{ padding: "32px", display: "flex", justifyContent: "center", backgroundColor: "#f8fafc" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "28px 24px",
              textAlign: "center",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* GlobalWebify Logo */}
            <img
              src="/globalwebify-logo.png"
              alt="GlobalWebify Logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              style={{
                height: "64px",
                width: "auto",
                objectFit: "contain",
              }}
            />

            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#181818", margin: "0 0 4px 0" }}>
                Visitor Registration
              </h3>
              <p style={{ fontSize: "11px", color: "#0E9A51", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>
                Scan To Register Your Visit
              </p>
            </div>

            <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              {previewDataUrl ? (
                <img src={previewDataUrl} alt="GlobalWebify Visitor QR" style={{ height: "180px", width: "180px", margin: "0 auto", display: "block" }} />
              ) : (
                <div style={{ height: "180px", width: "180px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "12px" }}>
                  Rendering...
                </div>
              )}
            </div>

            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#181818", margin: "0 0 2px 0" }}>
                Scan with smartphone camera
              </p>
              <p style={{ fontSize: "11px", color: "#4A4A4A", margin: 0 }}>
                Takes 30 seconds • No app download required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
