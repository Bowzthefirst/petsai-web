export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  onClick: () => void;
};

export const tiers: Tier[] = [
  {
    name: "Weekly",
    id: "tier-weekly",
    href: "#",
    priceMonthly: "$3.99/wk",
    priceYearly: "$15.96/mo",
    description: "Perfect for casual pet AI enthusiasts",
    features: [
      "1,050 coins per week",
      "~39 Leonardo Phoenix generations",
      "~75 Gemini edits",
      "~116 background removals",
      "All generation tools included",
    ],
    featured: false,
    cta: "Start Weekly",
    onClick: () => {},
  },
  {
    name: "Monthly",
    id: "tier-monthly",
    href: "#",
    priceMonthly: "$4.99/mo",
    priceYearly: "$49.99/yr",
    description: "Most popular plan for regular users",
    features: [
      "1,300 coins per month",
      "~100 generations included",
      "~48 Leonardo Phoenix generations",
      "~92 Gemini edits",
      "~144 background removals",
      "All generation tools included",
    ],
    featured: true,
    cta: "Start Monthly",
    onClick: () => {},
  },
  {
    name: "Annual",
    id: "tier-annual",
    href: "#",
    priceMonthly: "$4.17/mo",
    priceYearly: "$49.99/yr",
    description: "Best value - 2 months free!",
    features: [
      "15,600 coins per year",
      "~1,200 generations included",
      "2 months completely free",
      "~577 Leonardo Phoenix generations",
      "~1,114 Gemini edits",
      "~1,733 background removals",
      "All generation tools included",
    ],
    featured: false,
    cta: "Start Annual",
    onClick: () => {},
  },
  {
    name: "One-Time Packs",
    id: "tier-consumables",
    href: "#",
    priceMonthly: "From $0.99",
    priceYearly: "From $0.99",
    description: "Pay as you go with flexible coin packs",
    features: [
      "Snack Pack: 150 coins ($0.99)",
      "Treat Bag: 900 coins ($4.99)",
      "Deluxe Crate: 2,000 coins ($9.99)",
      "No subscription required",
      "Coins never expire",
      "Perfect for occasional use",
    ],
    featured: false,
    cta: "Buy Coins",
    onClick: () => {},
  },
];
