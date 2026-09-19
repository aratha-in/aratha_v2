"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome messages
    setMessages([
      {
        id: "init_1",
        sender: "bot",
        text: "Hi there! 👋 Welcome to Aratha Agency.",
        time: getFormattedTime(),
      },
      {
        id: "init_2",
        sender: "bot",
        text: "How can we help you today? Ask me about our Services, Portfolio, Pricing, or how to get a Free Consultation!",
        time: getFormattedTime(),
      },
    ]);

    // Pulsing notification after 5 seconds to invite action
    const timer = setTimeout(() => {
      if (!isOpen) setUnread(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnread(false);
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const getFormattedTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
      time: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue.toLowerCase().trim();
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Thank you for reaching out! A representative will connect with you shortly. You can also contact us directly at info@aratha.in.";

      if (query.includes("pricing") || query.includes("cost") || query.includes("price")) {
        replyText = "Our packages start at $999/mo for SEO, $2,499 for full websites, and $7,999 for custom SaaS applications. Check out our /pricing page for our custom plan calculator!";
      } else if (query.includes("services") || query.includes("develop") || query.includes("design") || query.includes("what do you do")) {
        replyText = "We offer Website Development, Web Apps, UI/UX Design, SEO Optimization, Branding, and Cloud Hosting. You can explore complete descriptions on our /services page!";
      } else if (query.includes("portfolio") || query.includes("work") || query.includes("projects") || query.includes("portfolio")) {
        replyText = "We have completed award-winning projects across E-Commerce, Healthcare, Real Estate, and Education. Check out our client showcases on the /portfolio page!";
      } else if (query.includes("consult") || query.includes("meeting") || query.includes("call") || query.includes("contact") || query.includes("hire")) {
        replyText = "We would love to discuss your project! Head over to our /contact page, fill out our consultation form, and we'll schedule a call within 24 hours.";
      } else if (query.includes("careers") || query.includes("jobs") || query.includes("work with us") || query.includes("hiring")) {
        replyText = "We're always looking for talented developers, designers, and marketers! Browse our open positions and submit your application on our /careers page.";
      } else if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
        replyText = "Hello! Tell me about the project you are building. We specialize in building responsive, high-performance web products!";
      }

      const botMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: "bot",
        text: replyText,
        time: getFormattedTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] max-w-[90vw] h-[480px] neu-flat flex flex-col mb-4 overflow-hidden animate-slide-up border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="bg-slate-900 border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl neu-button flex items-center justify-center font-bold text-emerald-400">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold">Aratha Assistant</h4>
                <span className="text-[10px] text-emerald-400/80 block font-medium">Usually replies instantly</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="neu-button p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 neu-pressed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === "user" ? "neu-button text-emerald-400" : "neu-flat text-slate-300"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div
                    className={`px-3.5 py-2.5 text-xs rounded-2xl ${
                      msg.sender === "user"
                        ? "neu-button text-white font-medium rounded-tr-none"
                        : "neu-flat text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[9px] text-slate-500 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isTyping && (
              <div className="flex gap-2.5 self-start max-w-[85%]">
                <div className="w-7 h-7 rounded-xl neu-flat flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl neu-flat text-slate-400 rounded-tl-none flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span className="text-xs">Typing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form footer */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 neu-input px-3.5 py-2 text-xs text-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="neu-button text-emerald-400 disabled:opacity-50 w-9 h-9 flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 neu-button text-emerald-400 flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200 active:scale-95 group relative border-emerald-500/30"
        aria-label="Open support chat"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform text-emerald-400" />
        {unread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold text-slate-950 animate-bounce">
            1
          </span>
        )}
      </button>
    </div>
  );
}
