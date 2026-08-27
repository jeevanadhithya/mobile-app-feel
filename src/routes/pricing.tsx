import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Info, Sparkles, TrendingUp } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Smart Price — Artisera" },
      {
        name: "description",
        content: "AI-optimized pricing for your handcrafted item, based on cost, market range and demand.",
      },
      { property: "og:title", content: "Smart Price — Artisera" },
      {
        property: "og:description",
        content: "AI-optimized pricing based on cost, market range and demand.",
      },
    ],
  }),
  component: SmartPricing,
});

function SmartPricing() {
  return (
    <PhoneFrame>
      <div className="space-y-4 px-4 pb-8 pt-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold">Smart Price</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-optimized pricing for your handcrafted item
          </p>
        </div>

        <section className="app-card space-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-ai-soft px-3 py-1.5 text-xs font-bold text-ai">
              <Sparkles className="h-3.5 w-3.5" /> AI suggested price
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive">
              <TrendingUp className="h-3.5 w-3.5" /> Demand: HIGH
            </span>
          </div>
          <p className="text-right text-xs text-muted-foreground">Confidence: 94%</p>
          <p className="font-display text-6xl font-extrabold tracking-tight text-primary">₹950</p>

          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Market Range</span>
              <span className="font-semibold text-foreground">₹850 - ₹1,100</span>
            </div>
            <div className="relative mt-2 h-2 rounded-full bg-secondary">
              <div className="absolute left-[20%] right-[10%] h-2 rounded-full bg-accent" />
              <div className="absolute left-[40%] top-1/2 h-4 w-2 -translate-y-1/2 rounded-full bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Production Cost</p>
              <p className="mt-1 text-xl font-extrabold">₹600</p>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Estimated Margin</p>
              <p className="mt-1 text-xl font-extrabold text-ai">₹350</p>
            </div>
          </div>

          <p className="flex items-start gap-2 rounded-xl bg-ai-soft/60 p-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Based on production cost, market range and current demand.
          </p>
        </section>

        <Link to="/profile" className="btn-cta">
          <CheckCircle2 className="h-4 w-4" /> Use This Price
        </Link>
        <Link to="/profile" className="btn-outline">
          Edit Manually
        </Link>
      </div>
    </PhoneFrame>
  );
}
