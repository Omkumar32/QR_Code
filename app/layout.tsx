import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobalWebify | Visitor Registration & Management System",
  description:
    "Production-grade Visitor Registration and Management System by GlobalWebify.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#FFFFFF" }}>
        {children}
      </body>
    </html>
  );
}
