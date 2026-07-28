export type FeedbackReason =
  | "Service"
  | "Product"
  | "Staff Behaviour"
  | "Website"
  | "Complaint"
  | "Suggestion"
  | "Other";

export interface FeedbackDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  reason: FeedbackReason;
  rating: number;
  message: string;
  createdAt: string;
}

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardMetrics {
  totalFeedback: number;
  averageRating: number;
  todayCount: number;
  positiveCount: number;
  negativeCount: number;
}
