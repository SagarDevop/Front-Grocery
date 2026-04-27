import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../Components/ui/Button";

export function SellerFinalCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-brand-600">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 border-[40px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 border-[20px] border-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Still Have Questions?</h2>
        <p className="text-brand-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Our dedicated seller support team is here to help you every step of the way. Reach out anytime on WhatsApp.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/917887263984" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 bg-white text-brand-600 hover:bg-brand-50 border-none shadow-2xl group">
              <MessageCircle className="mr-2" size={24} />
              Chat on WhatsApp
            </Button>
          </a>
          
          <button className="flex items-center text-white font-bold hover:underline transition-all">
            View Seller Policy <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
