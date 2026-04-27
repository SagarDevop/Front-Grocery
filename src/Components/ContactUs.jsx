import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Loader2,
} from "lucide-react";
import { Success, Error } from "../Utils/toastUtils.js";

import { Button } from "./ui/Button";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@greencart.com",
    color: "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+91 78872 63984",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "123 Grocery Lane, Fresh Market, Delhi",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon - Sun: 9:00 AM - 9:00 PM",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  },
];

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("Submitting:", { name, email, message });

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      setLoading(false);

      if (isSuccess) {
        Success("Your message has been sent successfully!");
        e.target.reset();
      } else {
        Error("Failed to send message. Please try again.");
      }
    }, 1500);
  };

  const inputClass = "w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 ring-brand-500 focus:border-transparent transition-all duration-300 outline-none";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark">
      {/* Hero Header */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-emerald-600/20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <div
            className="text-center"
          >
            <span className="text-brand-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              We'd Love to Hear <br className="hidden md:block" /> From You
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto font-medium">
              Have a question, feedback, or just want to say hello? Our team is here to help.
            </p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 overflow-hidden">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,111.9,122.1,108.7,185.3,95.1a365.64,365.64,0,0,0,136.09-38.66Z" 
                  className="fill-slate-50 dark:fill-surface-dark" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Contact Information
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Reach out through any of these channels
              </p>
            </div>

            {contactInfo.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark-gray border border-slate-200 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-shadow duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Follow Us</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110">
                  <Facebook size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110">
                  <Instagram size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-surface-dark-gray rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 sm:p-10 space-y-5"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                Send us a Message
              </h3>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us what's on your mind..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 ring-brand-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                size="lg"
                className="w-full h-14 rounded-xl text-base group"
              >
                {loading ? "Sending..." : (
                  <>
                    <Send size={18} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Embed */}
        <div
          className="mt-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
              <MapPin size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Find Us Here
            </h3>
          </div>
          <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <iframe
              className="w-full h-72 md:h-80"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d561.8399831624046!2d80.3460619!3d25.4934011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718806200000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917887263984"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 z-50 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
