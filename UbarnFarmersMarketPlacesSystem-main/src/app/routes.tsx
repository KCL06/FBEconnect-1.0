import { createBrowserRouter, Outlet } from "react-router";
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

/** Wraps an entire route subtree with Suspense. Used on the Layout outlet. */
function SuspenseOutlet() {
  return (
    <PageSuspense>
      <Outlet />
    </PageSuspense>
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
          { index: true,                   element: <SuspenseOutlet />, Component: Dashboard },
          { path: "market-prices",         element: <SuspenseOutlet />, Component: MarketPrices },
          { path: "messages",              element: <SuspenseOutlet />, Component: Messages },
          { path: "notification",          element: <SuspenseOutlet />, Component: Notification },
          { path: "reviews",               element: <SuspenseOutlet />, Component: ReviewsRatings },
          { path: "expert-knowledge",      element: <SuspenseOutlet />, Component: ExpertKnowledge },
          { path: "settings",              element: <SuspenseOutlet />, Component: Settings },
          { path: "profile",               element: <SuspenseOutlet />, Component: Profile },

          // ── Farmer-only routes ──────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer"]} />,    // 🎭 Role gate
            children: [
              { path: "farm-records",      Component: MyFarmRecords },
              { path: "products",          Component: Products },
              { path: "consultations",     Component: Consultations },
            ],
          },

          // ── Farmer + Buyer routes ───────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer", "buyer"]} />,
            children: [
              { path: "marketplace",       Component: MarketPlace },
              { path: "order-tracking",    Component: OrderTracking },
            ],
          },

          // ── Farmer + Buyer + Admin routes ───────────────────────────────
          {
            element: <RoleGuard allowedRoles={["farmer", "buyer", "admin"]} />,
            children: [
              { path: "transaction",       Component: Transaction },
            ],
          },

          // ── Buyer-only routes ───────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["buyer"]} />,
            children: [
              { path: "cart",              Component: Cart },
            ],
          },

          // ── Expert-only routes ──────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["expert"]} />,
            children: [
              { path: "expert-consultations", Component: ExpertConsultations },
            ],
          },

          // ── Admin-only routes ───────────────────────────────────────────
          {
            element: <RoleGuard allowedRoles={["admin"]} />,     // 🔴 Admin gate
            children: [
              { path: "admin",             Component: AdminDashboard },
              { path: "user-feedback",     Component: UserFeedback },
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
