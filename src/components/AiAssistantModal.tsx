"use client";

import { useState } from "react";
import { Sparkles, Bot, X, Send, User, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([
    {
      sender: "ai",
      text: "Hello! I am Aratha AI Market Intelligence Assistant. How can I assist you with website engineering, pricing, or tech stack scoping today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          prompt: userText,
          name,
          email,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "Our team is ready to assist you!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I am ready to help! Feel free to ask about our Next.js services, pricing, or project scoping." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          prompt: "Submitted lead via AI Assistant consultation prompt",
          name,
          email,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00E5FF", "#3B82F6", "#FFFFFF"],
        });
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Awesome! We have received your consultation brief, ${name || "friend"}. We will reach out to ${email} within 24 hours.`,
          },
        ]);
        setShowLeadForm(false);
      }
    } catch {
      console.error("Lead submit error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-24 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 font-bold shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          aria-label="Toggle Aratha AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-slate-950 animate-spin-slow" />
          <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">
            Aratha AI
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
        </button>
      </div>

      {/* AI Assistant Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 sm:right-10 w-[92vw] sm:w-[400px] h-[520px] glass-panel border-white/10 p-5 flex flex-col justify-between shadow-2xl z-50 animate-fade-in rounded-3xl">
          {/* Top Window Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Aratha AI Assistant
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <span className="text-[9px] text-cyan-400 font-mono">Market Intelligence Bot</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3 pr-1 text-xs font-sans">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold rounded-tr-none shadow-md"
                      : "bg-slate-950/80 border border-white/10 text-slate-200 rounded-tl-none font-mono"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Aratha AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Lead Capture Prompt Bar */}
          {!submitted && (
            <div className="mb-2">
              {!showLeadForm ? (
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold flex items-center justify-between hover:bg-slate-850 transition-colors"
                >
                  <span>Schedule Consultation via AI</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-2 bg-slate-950 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                    Direct Consultation Booking
                  </span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="neu-input py-1.5 px-3 text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="neu-input py-1.5 px-3 text-xs"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold rounded-xl"
                    >
                      Submit Brief
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="px-3 py-1.5 bg-slate-900 text-slate-400 text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-white/10 pt-3">
            <input
              type="text"
              placeholder="Ask about Next.js, pricing, or tech stack..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 neu-input py-2 px-3 text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 disabled:opacity-50 transition-transform active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
