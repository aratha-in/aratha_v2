"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Solutions", path: "/solutions" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 transition-all duration-300 pointer-events-none">
      <div
        className={`w-full max-w-7xl transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "py-3 px-6 rounded-2xl neu-flat shadow-2xl backdrop-blur-xl"
            : "bg-transparent py-4 px-2"
        }`}
      >
        <nav className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center w-36 group shrink-0 py-1">
            <Image
              src="/logo-white.png"
              alt="Aratha Logo"
              width={144}
              height={34}
              sizes="(max-width: 640px) 120px, 144px"
              className="w-full h-auto object-contain group-hover:brightness-125 transition-all duration-300"
              priority
            />
            <span className="block w-full text-center text-[6px] sm:text-[6.5px] uppercase tracking-tight text-white font-extrabold mt-0.5 leading-none opacity-90">
              Your Partner in Market Intelligence
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1.5 neu-pressed p-1.5 rounded-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-cyan-400 neu-pill-active font-bold shadow-sm"
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="p-2.5 neu-button text-cyan-400 text-xs font-bold"
              title="Get Free Consultation"
            >
              <ArrowRight className="w-5 h-5 text-cyan-400" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 neu-button text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-slate-950/95 backdrop-blur-lg z-40 flex flex-col p-6 animate-fade-in">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh] mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                  isActive(link.path)
                    ? "text-cyan-400 neu-pill-active font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl neu-button text-cyan-400 font-bold border-cyan-500/30"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
