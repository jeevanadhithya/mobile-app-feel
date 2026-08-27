import { createFileRoute } from "@tanstack/react-router";
import { Search, Star } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import { Chip } from "@/components/ui-bits";
import { categories, popularProducts, myProducts } from "@/data/mock";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Crafts — Artisera" },
      {
        name: "description",
        content: "Browse handcrafted products from verified Indian artisans by craft and region.",
      },
      { property: "og:title", content: "Explore Crafts — Artisera" },
      {
        property: "og:description",
        content: "Browse handcrafted products from verified Indian artisans.",
      },
    ],
  }),
  component: Explore,
});

const all = [...popularProducts, ...myProducts.map((p) => ({
  id: p.id,
  name: p.name,
  craft: p.tags.join(" • "),
  price: p.price,
  rating: "4.8",
  image: p.image,
}))];

function Explore() {
  return (
    <PhoneFrame>
      <div className="space-y-5 px-4 pb-8 pt-4">
        <h1 className="font-display text-2xl font-extrabold">Explore</h1>
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            placeholder="Search crafts, regions, artisans..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="hide-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <span key={c} className="shrink-0">
              <Chip>{c}</Chip>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {all.map((p) => (
            <article key={p.id} className="app-card overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-32 w-full object-cover"
              />
              <div className="space-y-1 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="min-w-0 truncate text-sm font-bold">{p.name}</h2>
                  <span className="flex shrink-0 items-center gap-0.5 text-xs font-bold text-primary">
                    <Star className="h-3 w-3 fill-current" />
                    {p.rating}
                  </span>
                </div>
                <p className="truncate text-[11px] text-muted-foreground">{p.craft}</p>
                <p className="text-sm font-extrabold text-primary">{p.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
