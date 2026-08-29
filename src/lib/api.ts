import { supabase } from "./supabase";

const API_URL = (import.meta.env['VITE_API_URL'] as string | undefined)?.replace(/\/$/, "");

export const apiConfigured = Boolean(API_URL);

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const API_NOT_CONFIGURED =
  "The Artisera API is not connected yet. Set VITE_API_URL to your backend.";

function friendlyMessage(status: number, fallback?: string): string {
  switch (status) {
    case 401:
      return "Please sign in again.";
    case 403:
      return "Complete your profile and verification first.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 500:
      return "Something went wrong. Please try again.";
    case 503:
      return "AI service is temporarily unavailable.";
    default:
      return fallback || "Something went wrong. Please try again.";
  }
}

async function accessToken(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  if (!API_URL) throw new ApiError(0, API_NOT_CONFIGURED);

  const token = await accessToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let body = init.body;
  if (init.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.json);
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      ...init,
      headers,
      body,
    });
  } catch {
    throw new ApiError(0, "Network error. Check your connection and try again.");
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const parsed = (await response.clone().json()) as { message?: string; error?: string };
      detail = parsed.message ?? parsed.error;
    } catch {
      detail = undefined;
    }
    throw new ApiError(response.status, friendlyMessage(response.status, detail));
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
