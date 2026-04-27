import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Yadav", location: "Kanpur, UP", quote: "GreenCart helped me reach new customers without leaving my store. I now get regular orders every day!", image: "https://i.pravatar.cc/100?img=11" },
  { name: "Suman Verma", location: "Bhopal, MP", quote: "The onboarding was super easy. Payments are fast, and I don't have to worry about deliveries.", image: "https://i.pravatar.cc/100?img=12" },
  { name: "Imran Sheikh", location: "Lucknow, UP", quote: "I joined GreenCart 2 months ago, and my earnings have doubled. Highly recommend to other vendors!", image: "https://i.pravatar.cc/100?img=13" },
];

export default function SellerTestimonials() {
  return (
    <section className="bg-slate-50 dark:bg-surface-dark py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-4">Hear From Our Sellers</h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-16"
        >
          {testimonials.map((seller, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-surface-dark-gray rounded-[2.5rem] shadow-premium p-10 h-full flex flex-col border border-slate-100 dark:border-slate-800 relative">
                <Quote className="absolute top-8 right-8 text-slate-100 dark:text-slate-800" size={64} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full border-4 border-brand-50 dark:border-brand-900/20 overflow-hidden shadow-lg">
                      <img src={seller.image} alt={seller.name} loading="lazy" width="100" height="100" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{seller.name}</h4>
                      <p className="text-sm text-slate-500 font-medium">{seller.location}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed text-lg">"{seller.quote}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
