import { useState } from "react";
import { toast } from "react-hot-toast";
import { Store, User, Phone, Mail, MapPin, Package, Send, Loader2 } from "lucide-react";
import { registerSeller } from "../api/auth";
import api from "../api/apiConfig";
import { Button } from "../Components/ui/Button";

export default function SellerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    store: "",
    products: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerSeller(formData);
      await api.post("/api/seller/notify-new-seller", {
        email: formData.email,
        name: formData.name,
        store: formData.store,
      });

      toast.success("Registration submitted! We'll contact you soon.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        store: "",
        products: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow outline-none text-slate-900 dark:text-white font-medium"
      />
    </div>
  );

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-slate-50 dark:bg-surface-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-brand-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-brand-500/30 mx-auto mb-8">
            <Store size={40} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Ready to Start Selling?
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Fill out the form below and our dedicated team will reach out within 24 hours.
          </p>
        </div>

        <div className="glass-effect p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              icon={User}
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={Phone}
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={MapPin}
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={Store}
              type="text"
              name="store"
              placeholder="Store Name"
              value={formData.store}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={Package}
              type="text"
              name="products"
              placeholder="Primary Products (e.g., Organic Veggies)"
              value={formData.products}
              onChange={handleChange}
              required
            />
            
            <div className="md:col-span-2 pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-brand-500/20 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Processing Application...
                  </>
                ) : (
                  <>
                    Submit Registration
                    <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                  </>
                )}
              </Button>
              <p className="text-center text-slate-400 text-xs mt-6 font-medium">
                By submitting, you agree to our <span className="text-brand-500 underline cursor-pointer">Seller Terms & Conditions</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
