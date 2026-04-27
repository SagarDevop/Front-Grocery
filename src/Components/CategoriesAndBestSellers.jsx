import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import { ArrowRight, Box } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/Button";

const CategoriesAndBestSellers = () => {
  const navigate = useNavigate();
  const defaultCategories = [
    { name: "Vegetables", image: "/Organic veggies.png", color: "from-green-100 to-emerald-50" },
    { name: "Fresh Fruits", image: "/Fresh Fruits.png", color: "from-rose-100 to-pink-50" },
    { name: "Instant Food", image: "/Instant Food.png", color: "from-blue-100 to-sky-50" },
    { name: "Dairy Products", image: "/Dairy Products.png", color: "from-orange-100 to-amber-50" },
    { name: "Bakery & Breads", image: "/Bakery & Breads.png", color: "from-sky-100 to-blue-50" },
    { name: "Grains & Cereals", image: "/Grains & Cereals.png", color: "from-purple-100 to-indigo-50" },
  ];

  const [categories, setCategories] = useState(defaultCategories);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, popularRes] = await Promise.all([
          api.get('/api/products/categories'),
          api.get('/api/products/popular')
        ]);
        
        if (catsRes.data && catsRes.data.length > 0) {
            const colors = [
              'from-green-100 to-emerald-50', 
              'from-rose-100 to-pink-50', 
              'from-blue-100 to-sky-50', 
              'from-orange-100 to-amber-50', 
              'from-sky-100 to-blue-50', 
              'from-purple-100 to-indigo-50', 
              'from-amber-100 to-yellow-50', 
              'from-teal-100 to-emerald-50'
            ];
            
            const assetMap = {
                "Vegetables": "/Organic veggies.png",
                "Fresh Fruits": "/Fresh Fruits.png",
                "Instant Food": "/Instant Food.png",
                "Dairy Products": "/Dairy Products.png",
                "Bakery & Breads": "/Bakery & Breads.png",
                "Grains & Cereals": "/Grains & Cereals.png",
                "Personal Care": "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
                "Snacks": "https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
            };

            const apiCats = catsRes.data.map((name, i) => ({
                name,
                image: assetMap[name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=512`,
                color: colors[i % colors.length]
            }));

            const merged = [...apiCats];
            defaultCategories.forEach(def => {
                if (!merged.find(c => c.name === def.name)) {
                    merged.push(def);
                }
            });
            
            setCategories(merged);
        }
        setBestSellers(popularRes.data);
      } catch (err) {
        console.error("Error fetching home data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Categories Section */}
      <section>
        <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
                <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">
                    Browse Collection
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Shop by Category
                </h2>
            </div>
            <Button 
                variant="ghost" 
                onClick={() => navigate('/products')}
                className="group text-brand-600 dark:text-brand-400 font-bold"
            >
                View All Categories <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {loading ? (
             [1,2,3,4,5,6].map(n => (
                <div key={n} className="space-y-4 animate-pulse">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[2rem]" />
                    <div className="h-4 w-2/3 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>
             ))
          ) : (
             categories.slice(0, 12).map((cat, index) => (
                <div
                  key={cat.name + index}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group cursor-pointer"
                >
                  <div className={`relative aspect-square rounded-[2rem] bg-gradient-to-br ${cat.color} overflow-hidden mb-4 shadow-premium hover:shadow-premium-hover transition-shadow duration-300`}>
                      <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          width="512"
                          height="512"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cat.name)}&background=random&color=fff&size=512`;
                          }}
                          className="w-full h-full object-contain p-6 mix-blend-multiply"
                      />
                  </div>
                  <h3 className="text-center font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              ))
          )}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section>
        <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
                <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">
                    Customer Favorites
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Our Best Sellers
                </h2>
            </div>
            <div className="flex gap-2">
               <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-500" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
               </div>
            </div>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1,2,3,4].map(n => (
                  <div key={n} className="space-y-4">
                    <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 rounded-[2rem] animate-pulse" />
                    <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  </div>
                ))}
            </div>
        ) : bestSellers.length === 0 ? (
            <div className="py-24 text-center glass-effect rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Box size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-bold">No trending products yet</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bestSellers.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        )}
      </section>

      {/* Promotional Banner */}
      <div className="relative rounded-[3rem] overflow-hidden bg-brand-600 text-white p-6 sm:p-12 md:p-20 shadow-2xl shadow-brand-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-1/4" />
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Summer Sale is Live! <br /> Get up to 40% OFF
          </h2>
          <p className="text-brand-100 text-lg mb-10 font-medium">
            Stock up on seasonal favorites and premium organic produce at unbeatable prices.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-brand-50 shadow-xl border-none">
            Grab the Deals
          </Button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
          alt="Sale" 
          loading="lazy"
          width="1974"
          height="1316"
          className="absolute right-[-10%] top-[-20%] w-2/3 h-[140%] object-cover opacity-20 md:opacity-40 pointer-events-none mix-blend-overlay rotate-12"
        />
      </div>
    </div>
  );
};

export default CategoriesAndBestSellers;
