import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

/**
 * FBEconnect – Protected Route Guard
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps all routes under /app/* to enforce authentication.
 *
 * Behaviour:
 *   1. While auth is being verified (loading === true):
 *      → Shows a full-screen loading spinner.
 *        This PREVENTS any protected page from rendering before the session
 *        check completes, closing the brief unauthenticated render window.
 *
 *   2. If the user is not authenticated (session === null):
 *      → Redirects to /login, preserving the intended destination in
 *        location.state.from so Login.tsx can redirect back after success.
 *
 *   3. If authenticated:
 *      → Renders the child route via <Outlet />.
 *
 * ⚠️ IMPORTANT: This is a CLIENT-SIDE guard. It protects the UI, not the data.
 * Always enforce data security via Supabase Row-Level Security (RLS) policies.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  // ── Step 1: Wait for auth verification to complete ──────────────────────
  if (loading) {
    return <Loading fullScreen message="Verifying session..." />;
  }

  // ── Step 2: Redirect unauthenticated users to login ──────────────────────
  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // Allows Login.tsx to redirect back
      />
    );
  }

  // ── Step 3: Render the protected page ────────────────────────────────────
  return <Outlet />;
}
