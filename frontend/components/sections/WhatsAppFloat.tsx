"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const handleRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      text.trim() || "Hello Aratha Agency! I'd like to get a consultation for my website project."
    );
    window.open(`https://wa.me/918639581525?text=${formattedText}`, "_blank");
    setIsOpen(false);
    setText("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
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
        <WhatsAppIcon className="w-7 h-7" />
      </button>
    </div>
  );
}
