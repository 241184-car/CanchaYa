import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import UserDashboard from "./pages/user/UserDashboard";
import MyBookings from "./pages/user/MyBookings";
import UserProfile from "./pages/user/UserProfile";
import Notifications from "./pages/user/Notifications";
import CourtsMap from "./pages/user/CourtsMap";
import CourtsList from "./pages/owner/CourtsList";
import CourtDetail from "./pages/owner/CourtDetail";
import BookingFlow from "./pages/owner/BookingFlow";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourts from "./pages/admin/AdminCourts";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPromotions from "./pages/admin/AdminPromotions";
import NotFound from "./pages/NotFound";
import { userStore } from "./utils/userStore";

function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: "customer" | "owner" | "admin";
}) {
  const user = userStore.getUser();
  if (!user) return <Navigate to="/login" />;

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === "customer") return <Navigate to="/dashboard" />;
    if (user.role === "owner") return <Navigate to="/courts" />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/" />;
  }
  return children;
}

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/complete-profile", element: <CompleteProfilePage /> },

  // Customer Routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole="customer">
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-bookings",
    element: (
      <ProtectedRoute requiredRole="customer">
        <MyBookings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole="customer">
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute requiredRole="customer">
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/map",
    element: (
      <ProtectedRoute requiredRole="customer">
        <CourtsMap />
      </ProtectedRoute>
    ),
  },

  // Owner Routes
  {
    path: "/courts",
    element: (
      <ProtectedRoute requiredRole="owner">
        <CourtsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/courts/:id",
    element: (
      <ProtectedRoute requiredRole="owner">
        <CourtDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/booking-flow/:courtId",
    element: (
      <ProtectedRoute requiredRole="owner">
        <BookingFlow />
      </ProtectedRoute>
    ),
  },
  {
    path: "/owner/dashboard",
    element: (
      <ProtectedRoute requiredRole="owner">
        <OwnerDashboard />
      </ProtectedRoute>
    ),
  },

  // Admin Routes
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/courts",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminCourts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/bookings",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminBookings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminReports />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/calendar",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminCalendar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/promotions",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPromotions />
      </ProtectedRoute>
    ),
  },

  // Catch-all
  { path: "*", element: <NotFound /> },
]);