import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, MapPin, MoreVertical, Pencil, Plus, Share2, Sparkles, Upload } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import { Chip } from "@/components/ui-bits";
import { myProducts } from "@/data/mock";
import artisan from "@/assets/artisan-meena.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Meena Devi — Artisan Profile | Artisera" },
      {
        name: "description",
        content:
          "Handloom artisan from Tamil Nadu preserving a 300-year-old weaving technique. Browse her products and story.",
      },
      { property: "og:title", content: "Meena Devi — Artisan Profile" },
      {
        property: "og:description",
        content: "Handloom artisan from Tamil Nadu. Browse her products and story.",
      },
    ],
  }),
  component: Profile,
});

const tabs = ["About", "Products (12)", "Story"] as const;

function Profile() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Products (12)");

  return (
    <PhoneFrame>
      <div className="space-y-4 px-4 pb-8 pt-4">
        <section className="ai-surface app-card space-y-3 p-5 text-center">
          <div className="relative mx-auto w-fit">
            <img
              src={artisan}
              alt="Meena Devi"
              width={600}
              height={600}
              className="h-28 w-28 rounded-full border-4 border-card object-cover"
            />
            <BadgeCheck className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-card text-ai" />
          </div>
          <h1 className="font-display text-3xl font-extrabold">Meena Devi</h1>
          <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Handloom Artisan, Tamil Nadu
          </p>
          <div className="grid grid-cols-3 divide-x divide-border rounded-xl bg-secondary py-3">
            {[
              ["12", "Products"],
              ["8", "Connections"],
              ["128", "Profile Views"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-extrabold text-primary">{v}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-cta text-sm">
              <Pencil className="h-4 w-4" /> Edit Profile
            </button>
            <button className="btn-outline text-sm">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </section>

        <div className="flex gap-5 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "-mb-px border-b-2 pb-2 text-sm font-semibold " +
                (tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "About" ? (
          <p className="app-card p-4 text-sm leading-relaxed text-muted-foreground">
            Meena has been weaving on a pit loom since she was fourteen. Her workshop in
            Kanchipuram employs six women and produces silk and organic cotton textiles for
            boutiques across India.
          </p>
        ) : tab === "Story" ? (
          <p className="app-card p-4 text-sm leading-relaxed text-muted-foreground">
            "My grandmother taught me that a saree carries the hands that made it. I want buyers
            far away to feel those hands." Meena is now training a new generation of weavers in
            her village through a shared-loom cooperative.
          </p>
        ) : (
          <div className="space-y-4">
            <Link
              to="/add"
              className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-card px-4 py-8 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <Plus className="h-6 w-6" />
              </span>
              <span className="font-display text-xl font-bold text-primary">Add New Product</span>
              <span className="text-sm text-muted-foreground">
                Use <Sparkles className="inline h-3.5 w-3.5 text-ai" /> AI Scan to automatically
                generate product details from photos.
              </span>
            </Link>

            {myProducts.map((p) => (
              <article key={p.id} className="app-card overflow-hidden">
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={700}
                    className="h-48 w-full object-cover"
                  />
                  <span
                    className={
                      "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-primary-foreground " +
                      (p.status === "Published" ? "bg-success" : "bg-warning")
                    }
                  >
                    {p.status}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <h2 className="min-w-0 truncate font-display text-lg font-bold">{p.name}</h2>
                    <span className="shrink-0 font-extrabold text-primary">{p.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  {p.status === "Published" ? (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <button className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-2.5 text-sm font-semibold">
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        aria-label="More options"
                        className="grid w-10 place-items-center rounded-xl border border-border"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link to="/pricing" className="btn-cta py-2.5 text-sm">
                        <Upload className="h-4 w-4" /> Publish
                      </Link>
                      <button className="rounded-xl bg-secondary py-2.5 text-sm font-semibold">
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
