import { Eye, Wallet, Truck, Clock3, Headphones } from "lucide-react";

const benefits = [
  { icon: <Eye className="w-8 h-8 text-brand-600" />, title: "High Visibility", desc: "Get your products in front of thousands of local buyers every day." },
  { icon: <Wallet className="w-8 h-8 text-brand-600" />, title: "Zero Setup Fees", desc: "Join and list your items without any upfront charges." },
  { icon: <Truck className="w-8 h-8 text-brand-600" />, title: "Delivery Support", desc: "We take care of delivery so you can focus on your products." },
  { icon: <Clock3 className="w-8 h-8 text-brand-600" />, title: "Fast Payouts", desc: "Receive payments on a weekly basis directly in your account." },
  { icon: <Headphones className="w-8 h-8 text-brand-600" />, title: "24/7 Seller Support", desc: "Our team is always available to help with any issue." },
];

export default function SellerBenefits() {
  return (
    <section className="bg-white dark:bg-surface-dark-gray py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">Partner Benefits</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-4">
            Why Sell With <span className="text-brand-600">GreenCart?</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We provide the infrastructure and audience so you can focus on what you do best: creating great products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-shadow duration-300 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
