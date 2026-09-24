"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function ServiceQuoteForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("website-development");
  const [budget, setBudget] = useState("$2,500 - $5,000");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const servicesMap: Record<string, number> = {
    "website-development": 2499,
    "web-application-development": 7999,
    "ui-ux-design": 1999,
    "seo": 999,
    "digital-marketing": 1499,
    "brand-identity": 2999,
    "cloud-hosting": 499,
    "maintenance": 299,
  };

  const getEstimatedCost = () => {
    const base = servicesMap[service] || 2499;
    if (budget === "$5,000 - $10,000") return base * 1.5;
    if (budget === "$10,000+") return base * 2.5;
    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Name and email are required fields.");
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
          message: `Inquiry for ${service} service. Budget limit: ${budget}. Est. Project cost: $${getEstimatedCost().toLocaleString()}. Additional Message: ${message}`,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.8 },
          colors: ["#FEC903", "#2563EB", "#FFFFFF"],
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to submit request.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finality {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 border border-white/10 w-full relative">
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-xl font-bold text-white">Project Cost Estimator</h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Select parameters to obtain instant scoping estimations and submit to our account team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Malhotra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading || success}
              className="glass-input px-4 py-2.5 text-xs focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. vikram@malhotragroup.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
              className="glass-input px-4 py-2.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Service Category</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={loading || success}
              className="glass-input px-4 py-2.5 text-xs bg-slate-950 focus:outline-none"
            >
              <option value="website-development">Website Development</option>
              <option value="web-application-development">Web App Development</option>
              <option value="ui-ux-design">UI/UX Design</option>
              <option value="seo">SEO Optimization</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="brand-identity">Brand Identity</option>
              <option value="cloud-hosting">Cloud Hosting</option>
              <option value="maintenance">Website Maintenance</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Budget Range</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={loading || success}
              className="glass-input px-4 py-2.5 text-xs bg-slate-950 focus:outline-none"
            >
              <option value="<$2,500">Under $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400">Additional Scoping Details</label>
          <textarea
            rows={3}
            placeholder="Tell us about page counts, feature details, database requirements, or specific design aesthetics..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || success}
            className="glass-input px-4 py-2.5 text-xs focus:outline-none resize-none"
          />
        </div>

        {/* Live Estimation Output */}
        <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 flex items-center justify-between mt-2">
          <span className="text-[10px] uppercase font-bold text-slate-500">Estimated Project Cost</span>
          <span className="text-xl font-bold text-secondary font-mono">
            ${getEstimatedCost().toLocaleString()}
          </span>
        </div>

        {errorMessage && (
          <p className="text-rose-500 text-xs font-semibold">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="w-full py-3.5 mt-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
              <span>Submitting Project Brief...</span>
            </>
          ) : success ? (
            <>
              <Check className="w-4.5 h-4.5 text-secondary animate-pulse" />
              <span>Inquiry Received! We will follow up.</span>
            </>
          ) : (
            <>
              <Send className="w-4.5 h-4.5" />
              <span>Submit Project Inquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
