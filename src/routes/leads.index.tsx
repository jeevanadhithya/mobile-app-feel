import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Send, SlidersHorizontal, Store, BadgeCheck, Crosshair } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import { Chip } from "@/components/ui-bits";
import { opportunities } from "@/data/mock";

export const Route = createFileRoute("/leads/")({
  head: () => ({
    meta: [
      { title: "Business Opportunities — Artisera" },
      {
        name: "description",
        content: "AI-curated bulk buyer requirements matched to your production capabilities.",
      },
      { property: "og:title", content: "Business Opportunities — Artisera" },
      {
        property: "og:description",
        content: "AI-curated buyer requirements matching your craft.",
      },
    ],
  }),
  component: Leads,
});

function Leads() {
  const [featured, ...rest] = opportunities;

  return (
    <PhoneFrame>
      <div className="space-y-4 px-4 pb-8 pt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-ai">B2B Matching</p>
        <h1 className="font-display text-3xl font-extrabold leading-tight">
          Business Opportunities
        </h1>
        <p className="text-sm text-muted-foreground">
          AI-curated buyer requirements matching your production capabilities.
        </p>
        <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </button>

        <article className="app-card space-y-4 p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary">
              <Store className="h-5 w-5 text-muted-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="flex items-center gap-1.5 font-display text-lg font-extrabold">
                <span className="min-w-0 truncate">{featured.buyer}</span>
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              </h2>
              <p className="text-xs text-muted-foreground">{featured.type}</p>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-primary/40 text-xs font-extrabold text-primary">
              {featured.match}%
            </span>
          </div>

          <h3 className="font-display text-2xl font-extrabold leading-tight">
            {featured.title}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-[11px] text-muted-foreground">Requirement</p>
              <p className="mt-1 text-lg font-extrabold">{featured.units}</p>
            </div>
            <div className="rounded-xl bg-ai-soft p-3">
              <p className="text-[11px] text-muted-foreground">Target Budget</p>
              <p className="mt-1 text-lg font-extrabold text-ai">{featured.budget}</p>
            </div>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[11px] text-muted-foreground">Timeline</p>
            <p className="mt-1 text-lg font-extrabold">{featured.timeline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {featured.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <Link to="/proposal" className="btn-cta">
              <Send className="h-4 w-4" /> Respond
            </Link>
            <Link to="/leads/$id" params={{ id: featured.id }} className="btn-outline">
              <Eye className="h-4 w-4" /> View Request
            </Link>
          </div>
        </article>

        {rest.map((o) => (
          <Link
            key={o.id}
            to="/leads/$id"
            params={{ id: o.id }}
            className="app-card block space-y-3 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ai-soft text-ai">
                <Store className="h-5 w-5" />
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-ai-soft px-3 py-1 text-xs font-bold text-ai">
                <Crosshair className="h-3.5 w-3.5" /> {o.match}% Match
              </span>
            </div>
            <h2 className="font-display text-xl font-extrabold">{o.buyer}</h2>
            <p className="text-sm text-muted-foreground">{o.summary}</p>
            <div className="flex items-center justify-between border-t border-border pt-2 text-sm">
              <span className="text-muted-foreground">Volume</span>
              <span className="font-bold">{o.units}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-bold text-ai">{o.budget}</span>
            </div>
          </Link>
        ))}

        <div className="app-card space-y-1 p-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary">
            <ArrowRight className="h-5 w-5" />
          </span>
          <h2 className="pt-2 font-display text-xl font-extrabold">View 12 More Opportunities</h2>
          <p className="text-sm text-muted-foreground">Based on your production profile</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
