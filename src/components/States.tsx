import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="app-card flex flex-col items-center gap-2 px-6 py-10 text-center">
      <Inbox className="h-7 w-7 text-muted-foreground" />
      <p className="font-bold">{title}</p>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      {action}
    </div>
  );
}

export function ErrorState({ error, action }: { error: unknown; action?: ReactNode }) {
  const message =
    error instanceof Error ? error.message : "Something went wrong. Please try again.";
  return (
    <div className="app-card flex flex-col items-center gap-2 px-6 py-8 text-center">
      <AlertCircle className="h-7 w-7 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}

export function InitialsAvatar({
  name,
  src,
  size = 96,
}: {
  name?: string | null;
  src?: string | null;
  size?: number;
}) {
  const initials = (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "Profile photo"}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size / 2.8 }}
      className="grid place-items-center rounded-full bg-secondary font-extrabold text-primary"
    >
      {initials || "?"}
    </span>
  );
}
