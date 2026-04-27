import { ArrowRight, Zap, ShieldCheck, Globe, IndianRupee } from "lucide-react";
import { Button } from "../Components/ui/Button";

export default function BecomeSellerHero({ onRegisterClick }) {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/10 skew-x-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold tracking-widest uppercase">
              <Zap size={14} /> Empower Your Business
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
              Sell on <span className="bg-gradient-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">GreenCart</span> <br /> 
              & Grow Rapidly
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
              Join thousands of local sellers reaching millions of customers. We provide the logistics, you focus on your products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onRegisterClick} className="h-14 px-8 text-lg group">
                Register as Seller
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <div className="flex items-center gap-4 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <p className="text-sm font-medium text-slate-300">
                  <span className="text-white font-bold">500+</span> active sellers
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-white font-bold">Trusted Platform</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Secure Payments</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-white font-bold">Wide Reach</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Millions of users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-500/20">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
                alt="Seller Success"
                className="w-full h-full object-cover"
                loading="lazy"
                width="1974"
                height="1316"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
