import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus, Heart, Star, TrendingUp, Sparkles, BadgeCheck } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import { categories, popularProducts } from "@/data/mock";
import hero from "@/assets/hero-craft.jpg";
import artisan from "@/assets/artisan-meena.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artisera — AI marketplace for artisans" },
      {
        name: "description",
        content:
          "Artisera helps artisans list handcrafted products with AI, price them smartly and match with bulk buyers.",
      },
      { property: "og:title", content: "Artisera — AI marketplace for artisans" },
      {
        property: "og:description",
        content: "List crafts with AI, price smartly, meet bulk buyers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PhoneFrame>
      <div className="space-y-6 px-4 pb-8 pt-4">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            placeholder="Search products..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={hero}
            alt="Artisan weaving at a loom"
            width={1024}
            height={640}
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 p-4">
            <h1 className="max-w-[15rem] font-display text-2xl font-extrabold leading-tight">
              Your craft deserves a bigger market.
            </h1>
            <Link to="/add" className="btn-cta w-auto self-start px-5 text-sm">
              <Plus className="h-4 w-4" /> Add Product
            </Link>
          </div>
        </section>

        <section className="ai-surface app-card space-y-3 p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-ai">
            <Sparkles className="h-4 w-4" /> AI market opportunity
          </p>
          <h2 className="font-display text-xl font-bold leading-snug">
            High demand for Bamboo Organizers
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-[11px] text-muted-foreground">Demand</p>
              <p className="flex items-center gap-1 font-bold text-destructive">
                HIGH (91/100) <TrendingUp className="h-4 w-4" />
              </p>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-[11px] text-muted-foreground">Potential Buyers</p>
              <p className="font-bold">7 ready to buy</p>
            </div>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[11px] text-muted-foreground">Suggested Price</p>
            <p className="font-bold text-primary">₹850-₹1,050</p>
          </div>
          <Link to="/leads/$id" params={{ id: "bamboo-craft-store" }} className="btn-cta text-sm">
            Explore Opportunity
          </Link>
        </section>

        <section>
          <ul className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
            {categories.map((c) => (
              <li key={c} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                  {c.slice(0, 2)}
                </span>
                <span className="text-[11px] text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold">Popular Products</h2>
            <Link to="/explore" className="text-sm font-semibold text-primary">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularProducts.map((p) => (
              <article key={p.id} className="app-card overflow-hidden">
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-32 w-full object-cover"
                  />
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-card">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </span>
                </div>
                <div className="space-y-1 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="min-w-0 truncate text-sm font-bold">{p.name}</h3>
                    <span className="flex shrink-0 items-center gap-0.5 text-xs font-bold text-primary">
                      <Star className="h-3 w-3 fill-current" />
                      {p.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{p.craft}</p>
                  <p className="text-sm font-extrabold text-primary">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-extrabold">Meet the Artisans</h2>
          <article className="app-card space-y-2 p-5 text-center">
            <div className="relative mx-auto w-fit">
              <img
                src={artisan}
                alt="Meena Devi, handloom artisan"
                loading="lazy"
                width={600}
                height={600}
                className="h-24 w-24 rounded-full object-cover"
              />
              <BadgeCheck className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-card text-ai" />
            </div>
            <h3 className="font-display text-xl font-bold">Meena Devi</h3>
            <p className="text-sm text-muted-foreground">Handloom Artisan • Tamil Nadu</p>
            <p className="text-sm text-muted-foreground">
              Preserving a 300-year-old weaving technique, Meena creates textiles that are
              both deeply traditional and quietly modern.
            </p>
            <Link to="/profile" className="btn-outline mt-2 text-sm">
              View Artisan
            </Link>
          </article>
        </section>
      </div>
    </PhoneFrame>
  );
}
