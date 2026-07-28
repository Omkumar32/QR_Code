import React from "react";
import { DashboardMetrics } from "@/types";
import { UserCheck, Calendar, Users, TrendingUp } from "lucide-react";

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const cards = [
    {
      title: "Total Visitors Registered",
      value: metrics.totalFeedback.toLocaleString(),
      subtitle: `${metrics.todayCount} registered today`,
      icon: UserCheck,
      iconColor: "#0E9A51",
      bgColor: "#DDF4E8",
    },
    {
      title: "Today's Visitor Count",
      value: metrics.todayCount.toString(),
      subtitle: "New entries recorded today",
      icon: Calendar,
      iconColor: "#0E9A51",
      bgColor: "#DDF4E8",
    },
    {
      title: "Active Registrations",
      value: metrics.totalFeedback.toString(),
      subtitle: "Database total entries",
      icon: Users,
      iconColor: "#0E9A51",
      bgColor: "#DDF4E8",
    },
    {
      title: "Visitor Activity Status",
      value: "Active",
      subtitle: "Real-time logging enabled",
      icon: TrendingUp,
      iconColor: "#0E9A51",
      bgColor: "#DDF4E8",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A4A" }}>
                {card.title}
              </span>
              <div
                style={{
                  height: "36px",
                  width: "36px",
                  borderRadius: "8px",
                  backgroundColor: card.bgColor,
                  color: card.iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ width: "18px", height: "18px" }} />
              </div>
            </div>
            <div style={{ marginTop: "12px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#181818", margin: "0 0 2px 0" }}>
                {card.value}
              </h3>
              <p style={{ fontSize: "12px", color: "#4A4A4A", margin: 0 }}>{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
