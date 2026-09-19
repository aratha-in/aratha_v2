"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Loader2, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          phone,
          message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.8 },
          colors: ["#FEC903", "#2563EB", "#FFFFFF"],
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Failed to submit message.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/919999999999?text=Hello%20Aratha%20Agency!%20I'd%20like%20to%20get%20a%20consultation.", "_blank");
  };

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-1/4 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Connect</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Get in <span className="text-gradient-gold">Touch</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Ready to scope a web project or request a free performance audit? Submit your details below, and we'll reply within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10 relative">
        
        {/* Left Col - Details & Maps */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white">Contact Information</h2>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@aratha.in"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-white/10 shrink-0">
                  <Mail className="w-5 h-5 text-secondary group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Mail Channels</span>
                  <span className="text-xs font-semibold text-white">info@aratha.in</span>
                </div>
              </a>

              <a
                href="tel:+919999999999"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-white/10 shrink-0">
                  <Phone className="w-5 h-5 text-secondary group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Hotline Support</span>
                  <span className="text-xs font-semibold text-white">+91-9999999999</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 hover:border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Agency HQ</span>
                  <span className="text-xs font-semibold text-white">Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp button */}
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/25"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat directly on WhatsApp</span>
            </button>
          </div>

          {/* Map Mockup Component */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white">Location Map</h3>
            <div className="w-full h-48 rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center select-none group">
              {/* Premium dark grid SVG mockup representation */}
              <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Visual abstract roads */}
                <path d="M 0 60 L 400 120" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none"/>
                <path d="M 120 0 L 220 200" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none"/>
              </svg>
              {/* HQ point */}
              <div className="relative z-10 flex flex-col items-center gap-1 animate-float">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white border-2 border-slate-950 shadow-lg shadow-accent/40">
                    <MapPin className="w-4.5 h-4.5 text-secondary" />
                  </div>
                  <span className="absolute -inset-1 rounded-full border border-accent animate-ping opacity-45" />
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  Aratha HQ
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col - Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 md:p-12 border-white/10 w-full">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl font-bold text-white">Send Inquiry Brief</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Detail your project requirements. We will compile our analysis and respond dynamically.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Candidate/Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading || success}
                  className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91-XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Detailed Request message</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Please describe page requirements, custom dashboards features, database designs, or SEO targets..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading || success}
                  className="glass-input px-4 py-3 text-xs focus:outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-rose-500 text-xs font-semibold">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 mt-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting briefing details...</span>
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4.5 h-4.5 text-secondary animate-pulse" />
                    <span>Brief received! We will follow up.</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Send Project Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
