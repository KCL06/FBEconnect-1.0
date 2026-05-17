import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { Profile, UserRole } from "../../lib/auth";

/**
 * FBEconnect – Auth Context
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides authentication state, profile data, and role information
 * to all child components.
 *
 * SECURITY NOTES:
 * - `loading` stays true until BOTH the session AND profile fetch complete.
 *   This prevents protected pages from rendering before auth is verified.
 * - Session changes are handled via onAuthStateChange to catch token refresh,
 *   sign-out, and expiry events.
 * - Role is read from the `profiles` table (server-side) — NOT from the JWT
 *   metadata — to prevent client-side role manipulation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isAuthenticated: false,
  hasRole: () => false,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, role, avatar_url")
        .eq("id", userId)
        .single();
      // A PGRST116 error means "no rows" — possible if DB trigger didn't run yet.
      // In that case, clear the profile but do NOT throw — keeps the user logged in.
      if (error && error.code !== "PGRST116") throw error;
      setProfile(data as Profile ?? null);
    } catch {
      // Profile fetch failure should not lock the user out — only clear the profile
      setProfile(null);
    } finally {
      // Always ensure loading is cleared even if something unexpected happens
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // ── Safety net: force-clear loading after 8 s to prevent infinite spinner
    //    (e.g., network timeout, missing profile row for new expert accounts)
    const safetyTimer = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 8000);

    // ── 1. Get the initial session on mount ────────────────────────────────
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!mounted) return;
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        await fetchProfile(initialSession.user.id);
      } else {
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });

    // ── 2. Subscribe to auth state changes ────────────────────────────────
    // This fires on: sign-in, sign-out, token refresh, session expiry
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, changedSession) => {
        if (!mounted) return;

        if (import.meta.env.DEV) {
          console.log("[Auth] event:", event);
        }

        setSession(changedSession);
        setUser(changedSession?.user ?? null);

        if (changedSession?.user) {
          // Fetch fresh profile on every auth event (fetchProfile clears loading itself)
          await fetchProfile(changedSession.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  /**
   * Returns true if the authenticated user has at least one of the given roles.
   * Always returns false while loading or unauthenticated.
   */
  const hasRole = useCallback(
    (roles: UserRole[]): boolean => {
      if (!profile) return false;
      return roles.includes(profile.role as UserRole);
    },
    [profile]
  );

  const isAuthenticated = !!session && !loading;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        isAuthenticated,
        hasRole,
        signOut: handleSignOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
