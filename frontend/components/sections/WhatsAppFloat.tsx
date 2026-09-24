"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const handleRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      text.trim() || "Hello Aratha Agency! I'd like to get a consultation for my website project."
    );
    window.open(`https://wa.me/919999999999?text=${formattedText}`, "_blank");
    setIsOpen(false);
    setText("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {/* WhatsApp Chat Card */}
      {isOpen && (
        <div className="w-[300px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-4 animate-slide-up">
          {/* Header */}
          <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                WA
              </div>
              <div>
                <h4 className="text-white text-xs font-semibold">Aratha WhatsApp</h4>
                <span className="text-[9px] text-white/80 block">Typically online 24/7</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body content */}
          <div className="p-4 bg-slate-950/40 text-slate-300 text-xs flex flex-col gap-2.5">
            <p className="leading-relaxed">
              Hey! Need a fast quote or have questions? Shoot us a message directly on WhatsApp.
            </p>
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-2.5 text-[11px] text-emerald-400">
              💡 Pre-filled support channels are open now.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRedirect} className="p-2.5 bg-slate-900 border-t border-white/5 flex gap-2">
            <input
              type="text"
              placeholder="Type inquiry details..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Chat</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all duration-200 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
