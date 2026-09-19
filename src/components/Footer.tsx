"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Check, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email: email.trim(),
        }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.95 },
          colors: ["#00E5FF", "#3B82F6", "#FFFFFF"],
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerColumns = {
    company: [
      { name: "About", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Contact", path: "/contact" },
    ],
    services: [
      { name: "Services", path: "/services" },
      { name: "Solutions", path: "/solutions" },
      { name: "Process", path: "/our-process" },
      { name: "Industries", path: "/industries" },
    ],
    work: [
      { name: "Portfolio", path: "/portfolio" },
      { name: "Case Studies", path: "/case-studies" },
    ],
    resources: [
      { name: "Blog", path: "/blog" },
      { name: "FAQ", path: "/faq" },
      { name: "Pricing", path: "/pricing" },
    ],
    client: [
      { name: "Client Space", path: "/portal" },
      { name: "CMS Admin", path: "/cms" },
    ],
  };

  return (
    <footer className="relative bg-[#090E1B] border-t border-white/10 pt-20 pb-10 overflow-hidden shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)]">
      {/* Decorative Cyan Glow Blobs */}
      <div className="glow-blob top-0 left-10" />
      <div className="glow-blob bottom-0 right-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        {/* Info & Logo Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Link href="/" className="flex flex-col items-start w-36 group shrink-0">
            <Image
              src="/logo-white.png"
              alt="Aratha Logo"
              width={144}
              height={34}
              className="w-full h-auto object-contain group-hover:brightness-125 transition-all duration-300"
            />
            <span className="block w-full text-center text-[6px] sm:text-[6.5px] uppercase tracking-tight text-white font-extrabold mt-0.5 leading-none opacity-90">
              Your Partner in Market Intelligence
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Aratha is your partner in market intelligence, website engineering, UI/UX systems design, SEO marketing, and cloud automation.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:info@aratha.in"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm group"
            >
              <Mail className="w-4 h-4 text-[#00E5FF] group-hover:scale-110 transition-transform" />
              <span>info@aratha.in</span>
            </a>
            <a
              href="tel:+919999999999"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm group"
            >
              <Phone className="w-4 h-4 text-[#00E5FF] group-hover:scale-110 transition-transform" />
              <span>+91-9999999999</span>
            </a>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Dynamic 5 Columns Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:col-span-8">
          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-wider uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerColumns.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#00E5FF] hover:translate-x-0.5 transition-all text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-wider uppercase">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerColumns.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#00E5FF] hover:translate-x-0.5 transition-all text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-wider uppercase">
              Work
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerColumns.work.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#00E5FF] hover:translate-x-0.5 transition-all text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-wider uppercase">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerColumns.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#00E5FF] hover:translate-x-0.5 transition-all text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-wider uppercase">
              Client
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerColumns.client.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#00E5FF] hover:translate-x-0.5 transition-all text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter & Audit Row in Neumorphic Panel */}
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-7 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Subscribe to Market Intelligence</h4>
            <p className="text-slate-400 text-xs">Get regular technological trends & market analytics in your inbox.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-sm">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || subscribed}
              className="w-full neu-input py-2.5 px-4 text-xs text-white placeholder-slate-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || subscribed}
              className="neu-button px-4 py-2.5 text-[#00E5FF] text-xs font-bold flex items-center justify-center shrink-0 disabled:opacity-50"
              aria-label="Subscribe"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>

        <div className="md:col-span-5 flex justify-end">
          <Link
            href="/contact"
            className="flex items-center justify-between gap-4 px-5 py-3 neu-button text-xs font-bold group transition-all"
          >
            <span className="text-slate-300 group-hover:text-[#00E5FF]">Free Website Audit</span>
            <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Legal & Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 relative z-10">
        <p>&copy; {currentYear} Aratha. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-slate-300">
            Privacy Policy
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/terms" className="hover:text-slate-300">
            Terms
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/cookies" className="hover:text-slate-300">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
