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
  const { session, profile, loading, signOut } = useAuth();
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

  // ── Step 3: Global Ghost Account Interceptor ─────────────────────────────
  // If the user has an auth token but their database profile failed to create
  // or they have an invalid role, DO NOT let them into the Layout.
  const validRoles = ["farmer", "buyer", "expert", "admin"];
  if (session && (!profile || !profile.role || !validRoles.includes(profile.role))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black/90 text-center p-8">
        <div className="bg-red-900/20 border border-red-500/30 p-8 rounded-2xl max-w-md backdrop-blur-sm shadow-xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Profile Setup Incomplete</h2>
          <p className="text-red-200/80 mb-6 text-sm leading-relaxed">
            It looks like your account setup was interrupted or the database failed to register your profile. You cannot access the dashboard without a valid role. Please log out and contact support or try registering again.
          </p>
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all w-full shadow-lg"
          >
            Log Out Now
          </button>
        </div>
      </div>
    );
  }

  // ── Step 4: Render the protected page ────────────────────────────────────
  return <Outlet />;
}
