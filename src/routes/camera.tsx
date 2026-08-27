import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Zap, ScanLine, Mic, Sparkles } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import bamboo from "@/assets/product-bamboo.jpg";

export const Route = createFileRoute("/camera")({
  head: () => ({
    meta: [
      { title: "Capture Product — Artisera" },
      {
        name: "description",
        content: "Center your product in the frame. AI auto-enhance cleans up the shot instantly.",
      },
      { property: "og:title", content: "Capture Product — Artisera" },
      {
        property: "og:description",
        content: "Snap your craft, AI auto-enhances the photo.",
      },
    ],
  }),
  component: CameraView,
});

function CameraView() {
  return (
    <PhoneFrame chrome={false}>
      <div className="relative min-h-screen bg-foreground">
        <img
          src={bamboo}
          alt="Camera viewfinder preview of a bamboo basket"
          width={800}
          height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        <div className="relative flex min-h-screen flex-col justify-between p-4">
          <div className="flex items-start gap-3">
            <Link
              to="/add"
              aria-label="Close camera"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground/50 text-background"
            >
              <X className="h-5 w-5" />
            </Link>
            <p className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-foreground/50 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-background">
              <ScanLine className="h-4 w-4 shrink-0" /> Center your product in the frame
            </p>
            <button
              aria-label="Flash"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground/50 text-background"
            >
              <Zap className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto aspect-square w-56 rounded-lg border-2 border-dashed border-background/80" />

          <div className="space-y-4">
            <p className="mx-auto flex w-fit items-center gap-2 rounded-full bg-foreground/70 px-4 py-2 text-xs font-semibold text-background">
              <Sparkles className="h-4 w-4" /> AI Auto-Enhance Active
            </p>
            <div className="flex items-center justify-between rounded-3xl bg-foreground/60 px-6 py-4">
              <span className="h-11 w-11 overflow-hidden rounded-lg border border-background/60">
                <img src={bamboo} alt="Last shot" loading="lazy" width={800} height={800} className="h-full w-full object-cover" />
              </span>
              <Link
                to="/review"
                aria-label="Capture photo"
                className="h-16 w-16 rounded-full border-4 border-background bg-background/90"
              />
              <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground/70 text-background">
                <Mic className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
