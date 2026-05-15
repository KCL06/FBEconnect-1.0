import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import Loading from "./components/Loading";

/**
 * FBEconnect – Application Routes
 * ─────────────────────────────────────────────────────────────────────────────
 * SECURITY:
 *   - All /app/* routes are wrapped in <ProtectedRoute> which enforces login.
 *   - Role-sensitive routes are additionally wrapped in <RoleGuard>.
 *
 * PERFORMANCE:
 *   - All page components are lazy-loaded (React.lazy + dynamic import).
 *   - Each page chunk is code-split at the route level, reducing initial bundle.
 *   - A <Suspense> fallback spinner shows while chunks load.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Public Pages (no auth required) ──────────────────────────────────────────
const Landing           = lazy(() => import("./pages/Landing"));
const Login             = lazy(() => import("./pages/Login"));
const Register          = lazy(() => import("./pages/Register"));
const RegisterFarmer    = lazy(() => import("./pages/RegisterFarmer"));
const RegisterBuyer     = lazy(() => import("./pages/RegisterBuyer"));
const RegisterExpert    = lazy(() => import("./pages/RegisterExpert"));
const ForgotPassword    = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword    = lazy(() => import("./pages/UpdatePassword"));
const Privacy           = lazy(() => import("./pages/Privacy"));
const Terms             = lazy(() => import("./pages/Terms"));
const NotFound          = lazy(() => import("./pages/NotFound"));

// ── Protected Pages (auth required) ──────────────────────────────────────────
const Layout            = lazy(() => import("./components/Layout"));
const Dashboard         = lazy(() => import("./pages/Dashboard"));
const MyFarmRecords     = lazy(() => import("./pages/MyFarmRecords"));
const Products          = lazy(() => import("./pages/Products"));
const MarketPrices      = lazy(() => import("./pages/MarketPrices"));
const Consultations     = lazy(() => import("./pages/Consultations"));
const Messages          = lazy(() => import("./pages/Messages"));
const MarketPlace       = lazy(() => import("./pages/MarketPlace"));
const Transaction       = lazy(() => import("./pages/Transaction"));
const Notification      = lazy(() => import("./pages/Notification"));
const ReviewsRatings    = lazy(() => import("./pages/ReviewsRatings"));
const OrderTracking     = lazy(() => import("./pages/OrderTracking"));
const ExpertKnowledge   = lazy(() => import("./pages/ExpertKnowledge"));
const ExpertConsultations = lazy(() => import("./pages/ExpertConsultations"));
const Cart              = lazy(() => import("./pages/Cart"));
const Settings          = lazy(() => import("./pages/Settings"));
const Profile           = lazy(() => import("./pages/Profile"));

// ── Admin-Only Pages ──────────────────────────────────────────────────────────
const AdminDashboard    = lazy(() => import("./pages/AdminDashboard"));
const UserFeedback      = lazy(() => import("./pages/UserFeedback"));

// ── Suspense Wrapper ──────────────────────────────────────────────────────────
/** Wraps lazy-loaded pages with a consistent loading fallback. */
function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
      {children}
    </Suspense>
  );
}



// ── Router Definition ─────────────────────────────────────────────────────────
export const router = createBrowserRouter([
  // ── Public Routes ───────────────────────────────────────────────────────
  {
    path: "/",
    element: <PageSuspense><Landing /></PageSuspense>,
    errorElement: <PageSuspense><NotFound /></PageSuspense>,
  },
  {
    path: "/privacy",
    element: <PageSuspense><Privacy /></PageSuspense>,
  },
  {
    path: "/terms",
    element: <PageSuspense><Terms /></PageSuspense>,
  },
  {
    path: "/login",
    element: <PageSuspense><Login /></PageSuspense>,
  },
  {
    path: "/register",
    element: <PageSuspense><Register /></PageSuspense>,
  },
  {
    path: "/forgot-password",
    element: <PageSuspense><ForgotPassword /></PageSuspense>,
  },
  {
    path: "/update-password",
    element: <PageSuspense><UpdatePassword /></PageSuspense>,
  },
  {
    path: "/register/farmer",
    element: <PageSuspense><RegisterFarmer /></PageSuspense>,
  },
  {
    path: "/register/buyer",
    element: <PageSuspense><RegisterBuyer /></PageSuspense>,
  },
  {
    path: "/register/expert",
    element: <PageSuspense><RegisterExpert /></PageSuspense>,
  },

  // ── Protected Routes (requires authentication) ───────────────────────────
  {
    element: <ProtectedRoute />,                       // 🔐 Auth gate
    children: [
      {
        path: "/app",
        element: (
          <PageSuspense>
            <Layout />
          </PageSuspense>
        ),
        children: [
          // ── Available to all authenticated roles ────────────────────────
          { index: true,                   element: <PageSuspense><Dashboard /></PageSuspense> },
          { path: "market-prices",         element: <PageSuspense><MarketPrices /></PageSuspense> },
          { path: "messages",              element: <PageSuspense><Messages /></PageSuspense> },
          { path: "notification",          element: <PageSuspense><Notification /></PageSuspense> },
          { path: "reviews",               element: <PageSuspense><ReviewsRatings /></PageSuspense> },
          { path: "expert-knowledge",      element: <PageSuspense><ExpertKnowledge /></PageSuspense> },
          { path: "settings",              element: <PageSuspense><Settings /></PageSuspense> },
          { path: "profile",               element: <PageSuspense><Profile /></PageSuspense> },

          // ── Farmer-only routes ──────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer"]} />,    // 🎭 Role gate
            children: [
              { path: "farm-records",      element: <PageSuspense><MyFarmRecords /></PageSuspense> },
              { path: "products",          element: <PageSuspense><Products /></PageSuspense> },
              { path: "consultations",     element: <PageSuspense><Consultations /></PageSuspense> },
            ],
          },

          // ── Farmer + Buyer routes ───────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer", "buyer"]} />,
            children: [
              { path: "marketplace",       element: <PageSuspense><MarketPlace /></PageSuspense> },
              { path: "order-tracking",    element: <PageSuspense><OrderTracking /></PageSuspense> },
            ],
          },

          // ── Farmer + Buyer + Admin routes ───────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer", "buyer", "admin"]} />,
            children: [
              { path: "transaction",       element: <PageSuspense><Transaction /></PageSuspense> },
            ],
          },

          // ── Buyer-only routes ───────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["buyer"]} />,
            children: [
              { path: "cart",              element: <PageSuspense><Cart /></PageSuspense> },
            ],
          },

          // ── Expert-only routes ──────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["expert"]} />,
            children: [
              { path: "expert-consultations", element: <PageSuspense><ExpertConsultations /></PageSuspense> },
            ],
          },

          // ── Admin-only routes ───────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["admin"]} />,     // 🔴 Admin gate
            children: [
              { path: "admin",             element: <PageSuspense><AdminDashboard /></PageSuspense> },
              { path: "user-feedback",     element: <PageSuspense><UserFeedback /></PageSuspense> },
            ],
          },

          // ── Catch-all within /app ───────────────────────────────────────
          {
            path: "*",
            element: <PageSuspense><NotFound /></PageSuspense>,
          },
        ],
      },
    ],
  },

  // ── Global 404 ───────────────────────────────────────────────────────────
  {
    path: "*",
    element: <PageSuspense><NotFound /></PageSuspense>,
  },
]);
