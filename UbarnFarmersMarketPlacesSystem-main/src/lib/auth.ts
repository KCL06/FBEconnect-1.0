import { supabase } from "./supabase";

export type UserRole = "farmer" | "buyer" | "expert";

// ── Sign Up ──────────────────────────────────────────
export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: UserRole
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  });
  if (error) throw error;
  return data;
}

// ── Sign In ──────────────────────────────────────────
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// ── Sign Out ─────────────────────────────────────────
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ── Get current session ──────────────────────────────
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ── Get profile from DB ───────────────────────────  ───
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

// ── Update profile ───────────────────────────────────
export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Save role-specific profile ───────────────────────
export async function saveFarmerProfile(userId: string, profile: Record<string, unknown>) {
  const { error } = await supabase.from("farmer_profiles").upsert({ id: userId, ...profile });
  if (error) throw error;
}

export async function saveFarmerVerification(userId: string, data: Record<string, unknown>) {
  const { error } = await supabase.from("farmer_verifications").upsert({ id: userId, ...data });
  if (error) throw error;
}

export async function saveBuyerProfile(userId: string, profile: Record<string, unknown>) {
  const { error } = await supabase.from("buyer_profiles").upsert({ id: userId, ...profile });
  if (error) throw error;
}

export async function saveExpertProfile(userId: string, profile: Record<string, unknown>) {
  const { error } = await supabase.from("expert_profiles").upsert({ id: userId, ...profile });
  if (error) throw error;
}
