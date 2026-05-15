import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LogIn, Clock } from "lucide-react";
import { supabase } from "../../lib/supabase";

/**
 * FBEconnect – Session Expired Modal
 * ─────────────────────────────────────────────────────────────────────────────
 * Listens for Supabase TOKEN_REFRESHED failures and SIGNED_OUT events that
 * occur while the user is actively using the app.
 *
 * When a session expires mid-session (not on initial load, which is handled
 * by ProtectedRoute), this shows a modal prompting the user to log in again
 * rather than silently redirecting or breaking the UI.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function SessionExpiredModal() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [hasSession, setHasSession] = useState(true); // Assume session exists on mount

  useEffect(() => {
    // Track session state to detect mid-session expiry (not initial load)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && hasSession) {
        // Only show modal if user had a session (i.e., was actively logged in)
        setVisible(true);
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setHasSession(true);
        setVisible(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [hasSession]);

  const handleLogin = () => {
    setVisible(false);
    navigate("/login");
  };

  if (!visible) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
    >
      <div className="bg-emerald-900 border border-emerald-700/50 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center ring-2 ring-amber-500/40">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        {/* Content */}
        <h2
          id="session-expired-title"
          className="text-xl font-bold text-white mb-2"
        >
          Session Expired
        </h2>
        <p className="text-emerald-200 text-sm mb-6 leading-relaxed">
          Your session has expired for security reasons. Please log in again to
          continue where you left off.
        </p>

        {/* CTA */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25"
          autoFocus
        >
          <LogIn className="w-4 h-4" />
          Log In Again
        </button>
      </div>
    </div>
  );
}
