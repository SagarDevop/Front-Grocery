import { IdCard, Banknote, Phone, ListOrdered, ImagePlus } from "lucide-react";

const requirements = [
  { icon: <IdCard className="w-7 h-7 text-brand-600" />, title: "Aadhar or PAN", desc: "Valid government ID for verification." },
  { icon: <Banknote className="w-7 h-7 text-brand-600" />, title: "Bank Account", desc: "With IFSC for weekly payouts." },
  { icon: <Phone className="w-7 h-7 text-brand-600" />, title: "Mobile & Email", desc: "For contact and order updates." },
  { icon: <ListOrdered className="w-7 h-7 text-brand-600" />, title: "Product Info", desc: "List of items with price and stock." },
  { icon: <ImagePlus className="w-7 h-7 text-brand-600" />, title: "Product Images", desc: "Optional but helps attract buyers." },
];

export default function SellerRequirements() {
  return (
    <section className="bg-white dark:bg-surface-dark-gray py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">Onboarding</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-4">What You Need to Start</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Just a few simple things to begin your journey as a verified seller on GreenCart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {requirements.map((item, idx) => (
            <div key={idx} className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:border-brand-500 transition-colors duration-300 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-brand-600 mb-6 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
