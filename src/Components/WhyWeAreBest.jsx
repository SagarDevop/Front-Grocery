import React from "react";
import { Truck, Leaf, Tag, Heart } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Lightning Fast Delivery",
    description: "Groceries delivered to your door in under 30 minutes, every single time.",
    color: "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400",
  },
  {
    icon: Leaf,
    title: "100% Fresh Guaranteed",
    description: "Fresh produce sourced directly from local farms. No middlemen.",
    color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Tag,
    title: "Best Prices Always",
    description: "Quality groceries at prices that make you smile. Save up to 40%.",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Heart,
    title: "Trusted by 10,000+",
    description: "Loved by thousands of happy customers across the country.",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Products" },
  { number: "30min", label: "Avg. Delivery" },
  { number: "4.9★", label: "App Rating" },
];

export default function WhyWeAreBest() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:via-brand-900/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-4">
            Why Customers Love Us
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We're not just a grocery store. We're a commitment to quality, freshness, and your convenience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-[2rem] bg-white dark:bg-surface-dark-gray border border-slate-200 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative rounded-[3rem] bg-slate-900 dark:bg-slate-800 p-12 md:p-16 overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
