import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { question: "How much does it cost to sell on GreenCart?", answer: "It's completely free to list your products. We charge a minimal transaction fee only when you successfully make a sale." },
  { question: "How will I receive payments?", answer: "Payments are processed every week and settled directly into your verified bank account." },
  { question: "Who handles the delivery?", answer: "You can either use your own delivery staff or leverage GreenCart's premium delivery network for a hassle-free experience." },
  { question: "Can I manage stock from my phone?", answer: "Absolutely! Our mobile-friendly seller dashboard allows you to update prices and stock levels on the go." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button className="w-full flex justify-between items-center p-6 text-left" onClick={() => setOpen(!open)}>
        <h4 className="font-bold text-slate-900 dark:text-white pr-8">{q}</h4>
        <div className={`w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} className="text-slate-500" />
        </div>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellerFAQ() {
  return (
    <section className="bg-slate-50 dark:bg-surface-dark-gray py-24 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle size={14} /> Questions?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Seller FAQs</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Everything you need to know about starting your journey with GreenCart.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <FAQItem key={idx} q={item.question} a={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
