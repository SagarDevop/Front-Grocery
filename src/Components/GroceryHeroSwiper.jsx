import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    title: 'Freshness Delivered to Your Doorstep',
    subtitle: 'PREMIUM GROCERY EXPERIENCE',
    description: 'Discover the finest selection of organic fruits, fresh vegetables, and daily essentials handpicked just for you.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
    cta: 'Shop Now',
  },
  {
    title: 'Organic & Pesticide Free Greens',
    subtitle: 'HEALTHY LIVING',
    description: 'Support local farmers and enjoy the purest taste of nature with our farm-to-table organic collection.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2072&auto=format&fit=crop',
    cta: 'Explore Organic',
  },
  {
    title: 'Big Savings on Daily Essentials',
    subtitle: 'BEST PRICES GUARANTEED',
    description: 'Get up to 40% off on your monthly grocery list. Quality products at prices that make you smile.',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2070&auto=format&fit=crop',
    cta: 'View Offers',
  },
];

export default function GroceryHeroSwiper() {
  return (
    <section className="w-full h-[70vh] md:h-[85vh] overflow-hidden relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  width="1974"
                  height="1316"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 backdrop-blur-md border border-brand-500/30 text-brand-400 text-xs font-bold tracking-[0.2em] mb-6">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="h-14 px-8 group">
                      {slide.cta}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                    <Button variant="secondary" size="lg" className="h-14 px-8 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 overflow-hidden line-height-0">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,111.9,122.1,108.7,185.3,95.1a365.64,365.64,0,0,0,136.09-38.66Z" 
                    className="fill-slate-50 dark:fill-surface-dark"></path>
          </svg>
      </div>
    </section>
  );
}
