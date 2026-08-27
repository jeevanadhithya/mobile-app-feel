import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, Mic, Image as ImageIcon, Pencil, X } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "Create a Product — Artisera" },
      {
        name: "description",
        content: "Add a product with a photo, your voice or manually. AI writes the listing for you.",
      },
      { property: "og:title", content: "Create a Product — Artisera" },
      {
        property: "og:description",
        content: "Photo, voice or manual — AI writes your product listing.",
      },
    ],
  }),
  component: AddProduct,
});

function AddProduct() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-end">
        <div className="absolute inset-0 bg-foreground/25" aria-hidden />
        <div className="relative rounded-t-3xl bg-card p-5 pb-8 shadow-[0_-10px_40px_-20px_rgba(30,20,80,0.6)]">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
          <h1 className="text-center font-display text-2xl font-extrabold">Create a Product</h1>
          <p className="mx-auto mt-1 max-w-[18rem] text-center text-sm text-muted-foreground">
            Show us what you made. AI will help with the rest.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              to="/camera"
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/60 py-6"
            >
              <Camera className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Take Photo</span>
            </Link>
            <Link
              to="/review"
              className="relative flex flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/60 py-6"
            >
              <span className="absolute right-3 top-2 text-[11px] font-bold text-ai">✨ AI</span>
              <Mic className="h-6 w-6 text-ai" />
              <span className="text-lg font-bold">Describe with Voice</span>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/review"
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-semibold"
              >
                <ImageIcon className="h-4 w-4" /> From Gallery
              </Link>
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-semibold"
              >
                <Pencil className="h-4 w-4" /> Enter Manually
              </Link>
            </div>
          </div>

          <button
            aria-label="Close"
            onClick={() => navigate({ to: "/" })}
            className="mx-auto mt-6 grid h-11 w-11 place-items-center rounded-full bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
