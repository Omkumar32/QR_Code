import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { MetricsOverview } from "@/features/admin/MetricsOverview";
import { FeedbackDataTable } from "@/features/admin/FeedbackDataTable";
import { DashboardMetrics, FeedbackDTO } from "@/types";
import Link from "next/link";
import { QrCode } from "lucide-react";

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/admin/login");
  }

  const totalFeedback = await prisma.feedback.count();
  const positiveCount = await prisma.feedback.count({
    where: { rating: { gte: 4 } },
  });
  const negativeCount = await prisma.feedback.count({
    where: { rating: { lte: 2 } },
  });

  const avgRatingAgg = await prisma.feedback.aggregate({
    _avg: { rating: true },
  });
  const averageRating = avgRatingAgg._avg.rating || 5.0;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayCount = await prisma.feedback.count({
    where: { createdAt: { gte: todayStart } },
  });

  const metrics: DashboardMetrics = {
    totalFeedback,
    averageRating,
    todayCount,
    positiveCount,
    negativeCount,
  };

  // Raw feedback data
  const rawFeedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  const feedbacks: FeedbackDTO[] = rawFeedbacks.map((f) => ({
    id: f.id,
    name: f.name,
    email: f.email,
    phone: f.phone,
    reason: f.reason as any,
    rating: f.rating,
    message: f.message,
    createdAt: f.createdAt.toISOString(),
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <Navbar adminName={admin.name} />

      <main style={{ flex: 1, padding: "32px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Workspace Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>
              Visitor Registration Dashboard
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Real-time visitor logs, search/filter table, record deletion, and CSV/Excel exports.
            </p>
          </div>

          <Link
            href="/admin/qrcodes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            <QrCode style={{ width: "16px", height: "16px" }} />
            <span>QR Code Studio</span>
          </Link>
        </div>

        {/* 1. Stat Cards */}
        <MetricsOverview metrics={metrics} />

        {/* 2. Visitor Data Table with Search, Filter, Pagination, Delete, Export */}
        <FeedbackDataTable initialFeedbacks={feedbacks} />
      </main>
    </div>
  );
}
