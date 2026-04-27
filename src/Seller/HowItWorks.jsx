import { UserPlus, Upload, ShoppingCart, Banknote } from "lucide-react";

const stepList = [
  { icon: <UserPlus size={32} />, title: "Sign Up", desc: "Create your verified seller profile in minutes." },
  { icon: <Upload size={32} />, title: "List Products", desc: "Upload items with high-quality images & stock." },
  { icon: <ShoppingCart size={32} />, title: "Get Orders", desc: "Receive instant notifications for new purchases." },
  { icon: <Banknote size={32} />, title: "Get Paid", desc: "Fast weekly settlements directly to your bank." },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-900 py-24 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-brand-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-16">
          <span className="text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-4">How to Get Started</h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-medium">
            Join our marketplace in four quick steps and start growing your business today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2" />
          
          {stepList.map((step, idx) => (
            <div key={idx} className="relative group flex flex-col items-center">
              <div className="w-20 h-20 rounded-[2rem] bg-slate-800 border border-white/10 flex items-center justify-center text-brand-400 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300 shadow-xl z-10">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-black text-slate-500">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
