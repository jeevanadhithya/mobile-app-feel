import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, supabaseConfigured, NOT_CONFIGURED_MESSAGE } from "./supabase";
import { apiFetch } from "./api";
import type { Profile, Role } from "./types";

interface AuthValue {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  profileLoading: boolean;
  profileError: Error | null;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (args: { name: string; email: string; password: string; role: Role }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") return;
      setSession(next);
      queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [queryClient]);

  const profileQuery = useQuery({
    queryKey: ["profile", session?.user.id],
    enabled: Boolean(session),
    retry: false,
    queryFn: () => apiFetch<Profile>("/api/profile/me"),
  });

  const value = useMemo<AuthValue>(
    () => ({
      session,
      loading,
      profile: profileQuery.data ?? null,
      profileLoading: profileQuery.isLoading,
      profileError: (profileQuery.error as Error | null) ?? null,
      configured: supabaseConfigured,
      signIn: async (email, password) => {
        if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
      },
      signUp: async ({ name, email, password, role }) => {
        if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw new Error(error.message);
      },
      signInWithGoogle: async () => {
        if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw new Error(error.message);
      },
      resetPassword: async (email) => {
        if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback`,
        });
        if (error) throw new Error(error.message);
      },
      signOut: async () => {
        await queryClient.cancelQueries();
        queryClient.clear();
        if (supabase) await supabase.auth.signOut();
        setSession(null);
      },
    }),
    [session, loading, profileQuery.data, profileQuery.isLoading, profileQuery.error, queryClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function homeRouteFor(profile: Profile | null): string {
  if (!profile) return "/login";
  if (profile.status === "incomplete") return "/profile-setup";
  if (profile.role === "admin") return "/admin/dashboard";
  if (profile.role === "buyer") return "/buyer/home";
  return "/artisan/home";
}
