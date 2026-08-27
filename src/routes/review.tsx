import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Pencil, Sparkles, Leaf, Shield, Grid3x3, Map } from "lucide-react";
import { PhoneFrame } from "@/components/AppShell";
import { AiBadge, PageHeader } from "@/components/ui-bits";
import bamboo from "@/assets/product-bamboo.jpg";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review AI Generation — Artisera" },
      {
        name: "description",
        content: "Review the AI-generated catalog listing for your handcrafted product before publishing.",
      },
      { property: "og:title", content: "Review AI Generation — Artisera" },
      {
        property: "og:description",
        content: "AI wrote your listing — review, edit and approve.",
      },
    ],
  }),
  component: Review,
});

const facts = [
  { label: "Category", value: "Bamboo", icon: Leaf },
  { label: "Material", value: "Natural Bamboo", icon: Shield },
  { label: "Craft Type", value: "Weaving", icon: Grid3x3 },
  { label: "Region", value: "Assam", icon: Map },
];

function Review() {
  return (
    <PhoneFrame>
      <div className="pb-8">
        <PageHeader title="Review AI Generation" back="/add" />
        <div className="space-y-4 px-4">
          <div className="app-card overflow-hidden p-3">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={bamboo}
                alt="AI enhanced photo of a handwoven bamboo organizer"
                width={800}
                height={800}
                className="h-64 w-full object-cover"
              />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ai">
                <Sparkles className="h-3.5 w-3.5" /> Enhanced Image
              </span>
            </div>
          </div>

          <div className="app-card space-y-3 p-4">
            <AiBadge>AI Generated Listing</AiBadge>
            <h2 className="font-display text-2xl font-extrabold leading-tight">
              Handwoven Bamboo Organizer
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A beautifully crafted organizer woven from sustainably sourced Assamese bamboo.
              Perfect for decluttering your desk, vanity or living space, this piece brings a
              touch of organic elegance to any modern interior.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {facts.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl bg-secondary p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-bold">
                    <Icon className="h-4 w-4 shrink-0 text-ai" /> {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link to="/pricing" className="btn-cta">
            <CheckCircle2 className="h-4 w-4" /> Approve Catalog
          </Link>
          <Link to="/pricing" className="btn-outline">
            <Pencil className="h-4 w-4" /> Edit
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
