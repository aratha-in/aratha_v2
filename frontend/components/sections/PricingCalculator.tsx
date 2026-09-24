"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  // Custom Plan Calculator state
  const [pageCount, setPageCount] = useState(5);
  const [hasCms, setHasCms] = useState(true);
  const [hasSEO, setHasSEO] = useState(true);
  const [hasDashboard, setHasDashboard] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);

  // Proposal states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleGenerateProposal = async () => {
    if (!clientName.trim() || !clientEmail.trim()) {
      alert("Please provide both Name and Business Email to generate your proposal.");
      return;
    }
    setSubmitting(true);
    try {
      const budget = calculateCustomPlan();
      const scopeText = `Generated custom pricing proposal. Scope: ${pageCount} pages, CMS: ${hasCms ? 'Yes' : 'No'}, SEO: ${hasSEO ? 'Yes' : 'No'}, Dashboard: ${hasDashboard ? 'Yes' : 'No'}, Support: ${hasSupport ? 'Yes' : 'No'}. Estimated price: $${budget}`;
      
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: clientName,
          email: clientEmail,
          message: scopeText
        })
      });
      
      setShowProposalModal(true);
    } catch (err) {
      console.error("Proposal lead logging failed:", err);
      setShowProposalModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const tiers = [
    {
      name: "Starter Brand",
      monthly: 2999,
      annual: 2399,
      period: "one-time",
      desc: "Perfect for establishing brand credibility.",
      features: [
        "Logo Mark & Brand Asset kit",
        "Curated brand colors & rules",
        "Typography Scales specifications",
        "Stationery templates layout",
        "Delivered in 2 weeks"
      ]
    },
    {
      name: "Corporate Web",
      monthly: 4999,
      annual: 3999,
      period: "one-time",
      desc: "Ideal for growing corporate enterprises.",
      features: [
        "Up to 10 page custom Next.js site",
        "Self-managed JSON Admin CMS",
        "Structured Schema metadata setup",
        "Mobile responsive optimizations",
        "30-day support SLA warrant"
      ],
      popular: true
    },
    {
      name: "Full App Platform",
      monthly: 9999,
      annual: 7999,
      period: "starter price",
      desc: "Bespoke SaaS platform architectures.",
      features: [
        "Interactive profile consoles & DBs",
        "Custom RESTful APIs & sockets",
        "Secure Stripe payment checkouts",
        "AWS containerized deployments",
        "60-day support SLA warrant"
      ]
    }
  ];

  const calculateCustomPlan = () => {
    let base = 1500;
    base += pageCount * 250;
    if (hasCms) base += 1200;
    if (hasSEO) base += 800;
    if (hasDashboard) base += 2000;
    if (hasSupport) base += 500;

    if (billingCycle === "annual") {
      return base * 0.8;
    }
    return base;
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white font-bold" : "text-slate-400"}`}>
          Monthly Billing
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
          className="relative w-12 h-6.5 rounded-full bg-slate-800 border border-white/10 transition-colors p-0.5"
          aria-label="Toggle billing cycle"
        >
          <span
            className={`block w-5 h-5 rounded-full bg-accent transition-all ${
              billingCycle === "annual" ? "translate-x-5.5" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === "annual" ? "text-white font-bold" : "text-slate-400"}`}>
          <span>Annual Billing</span>
          <span className="px-2 py-0.5 rounded-md bg-secondary text-slate-950 text-[9px] font-extrabold uppercase tracking-wider">
            Save 20%
          </span>
        </span>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`glass-card p-8 flex flex-col justify-between min-h-[500px] relative ${
              tier.popular ? "border-accent shadow-accent/5 shadow-2xl scale-102" : "border-white/10"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent border border-accent/20 text-[9px] font-extrabold uppercase text-white tracking-widest">
                Most Popular
              </span>
            )}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white">
                  ${billingCycle === "monthly" ? tier.monthly.toLocaleString() : tier.annual.toLocaleString()}
                </span>
                <span className="text-slate-500 text-xs font-medium">/{tier.period}</span>
              </div>

              <ul className="flex flex-col gap-3.5 border-t border-white/5 pt-6">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex gap-2.5 text-xs text-slate-300 items-start">
                    <Check className="w-4.5 h-4.5 text-secondary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/contact?plan=${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`w-full text-center py-3.5 rounded-xl font-bold text-xs transition-all mt-8 ${
                tier.popular
                  ? "bg-accent hover:bg-accent-hover text-white shadow-lg"
                  : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>

      {/* Interactive custom plan builder calculator */}
      <div className="glass-panel p-8 md:p-12 border-white/10 max-w-3xl mx-auto w-full relative print:hidden">
        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-5.5 h-5.5 text-secondary" /> Custom Plan Calculator
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Need a specific scope? Drag page limits and check key integrations to view estimated pricing budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400 uppercase tracking-wider">Page Count Limit</span>
                <span className="text-white font-mono">{pageCount} Pages</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-accent border border-white/5"
              />
            </div>

            {/* Checkboxes grid */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Core Integrations
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={hasCms}
                  onChange={(e) => setHasCms(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-950 text-accent focus:ring-0 cursor-pointer"
                />
                <span>Payload Content CMS (self-managed)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={hasSEO}
                  onChange={(e) => setHasSEO(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-950 text-accent focus:ring-0 cursor-pointer"
                />
                <span>Advanced Google SEO Metadata Setup</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={hasDashboard}
                  onChange={(e) => setHasDashboard(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-950 text-accent focus:ring-0 cursor-pointer"
                />
                <span>Back-Office Admin CMS Dashboard</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={hasSupport}
                  onChange={(e) => setHasSupport(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-950 text-accent focus:ring-0 cursor-pointer"
                />
                <span>Priority Maintenance Support SLA</span>
              </label>
            </div>
          </div>

          {/* Scopes and totals */}
          <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[300px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Scope Summary</span>
                <h4 className="text-white text-sm font-semibold">Bespoke Software Build</h4>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Includes responsive Next.js modules, structured mock databases, and production codes.
                </p>
              </div>

              {/* Lead Capture Fields */}
              <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Request Official Proposal</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Estimated Price</span>
                <span className="text-2xl font-extrabold text-secondary font-mono">
                  ${calculateCustomPlan().toLocaleString()}
                </span>
              </div>
              
              <button
                type="button"
                onClick={handleGenerateProposal}
                disabled={submitting}
                className="w-full py-3 mt-4 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-accent/15 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Logging Proposal...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Proposal Contract</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROPOSAL MODAL */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6 overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0 print:block">
          <div className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-10 relative flex flex-col gap-8 print:border-none print:bg-white print:shadow-none print:p-0 print:text-black">
            <div className="flex justify-between items-center border-b border-white/5 pb-4 print:hidden">
              <div>
                <h3 className="text-white text-base font-bold">Generated Proposal Brief</h3>
                <p className="text-slate-400 text-xs mt-0.5">Ready to print or export as PDF.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowProposalModal(false)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 border border-white/10 hover:border-white/20 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 print:text-slate-950">
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 print:border-slate-300">
                <div>
                  <h1 className="text-2xl font-extrabold text-white print:text-black">ARATHA AGENCY</h1>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold print:text-slate-500">
                    Enterprise Software engineering
                  </span>
                </div>
                <div className="text-right flex flex-col gap-0.5 text-xs text-slate-400 print:text-slate-600">
                  <span>Proposal ID: #PROP-2026-{(1000 + Math.floor(Math.random() * 9000))}</span>
                  <span>Date: {new Date().toISOString().split("T")[0]}</span>
                  <span>Valid For: 30 Days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 print:bg-slate-100 print:border-slate-200 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500 print:text-slate-600">Prepared For:</span>
                  <span className="font-bold text-white print:text-black">{clientName}</span>
                  <span className="text-slate-400 print:text-slate-600">{clientEmail}</span>
                </div>
                <div className="flex flex-col gap-1 text-right sm:text-left">
                  <span className="text-[9px] uppercase font-bold text-slate-500 print:text-slate-600">Prepared By:</span>
                  <span className="font-bold text-white print:text-black">Aratha Solutions Group</span>
                  <span className="text-slate-400 print:text-slate-600">proposals@aratha.in</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider print:text-slate-700">Project Scopes & Fees</span>
                <div className="border border-white/5 rounded-xl overflow-hidden print:border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-white/5 print:bg-slate-100 print:text-slate-700 print:border-slate-200">
                        <th className="p-3">Deliverable Item</th>
                        <th className="p-3 text-right">Estimated Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 print:divide-slate-200">
                      <tr className="print:text-black">
                        <td className="p-3 font-semibold">Custom Next.js Website Build ({pageCount} Pages)</td>
                        <td className="p-3 text-right font-mono">${(1500 + pageCount * 250).toLocaleString()}</td>
                      </tr>
                      {hasCms && (
                        <tr className="print:text-black">
                          <td className="p-3">Payload CMS Content Management System</td>
                          <td className="p-3 text-right font-mono">$1,200</td>
                        </tr>
                      )}
                      {hasSEO && (
                        <tr className="print:text-black">
                          <td className="p-3">Advanced Schema SEO Scoping</td>
                          <td className="p-3 text-right font-mono">$800</td>
                        </tr>
                      )}
                      {hasDashboard && (
                        <tr className="print:text-black">
                          <td className="p-3">Admin Back-Office Panel</td>
                          <td className="p-3 text-right font-mono">$2,000</td>
                        </tr>
                      )}
                      {hasSupport && (
                        <tr className="print:text-black">
                          <td className="p-3">Priority Support Maintenance SLA</td>
                          <td className="p-3 text-right font-mono">$500</td>
                        </tr>
                      )}
                      {billingCycle === "annual" && (
                        <tr className="text-secondary print:text-slate-800">
                          <td className="p-3 font-semibold">Annual Billing Contract Discount (20%)</td>
                          <td className="p-3 text-right font-mono">
                            -${Math.round((calculateCustomPlan() / 0.8) * 0.2).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      <tr className="bg-slate-950 font-bold text-white border-t border-white/10 print:bg-slate-200 print:text-black print:border-slate-300">
                        <td className="p-4 text-sm">Total Projected Budget</td>
                        <td className="p-4 text-right text-sm font-mono text-secondary print:text-black">
                          ${calculateCustomPlan().toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2 text-[10px] text-slate-400 leading-relaxed print:text-slate-600">
                <span className="text-[10px] uppercase font-bold text-slate-300 print:text-slate-800 tracking-wider">Project Terms</span>
                <p>&bull; Delivery Schedule: Estimated development timeline is 4 to 6 weeks from kickoff date.</p>
                <p>&bull; Payment Terms: 50% upfront deposit before sitemap design, 50% on final QA staging acceptance.</p>
                <p>&bull; Standard deployment is on Vercel Edge Server or AWS infrastructure.</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/5 print:border-slate-200">
                <div className="flex flex-col gap-6">
                  <div className="h-10 border-b border-white/20 print:border-slate-300" />
                  <div className="flex flex-col text-[10px]">
                    <span className="font-bold text-white print:text-black">Authorized Signee</span>
                    <span className="text-slate-500 print:text-slate-600">Client Signature Placeholder</span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 text-right sm:text-left">
                  <div className="h-10 border-b border-white/20 print:border-slate-300 relative flex items-end justify-center sm:justify-start">
                    <span className="font-mono text-secondary text-xs italic font-bold tracking-widest opacity-80 print:text-slate-800">
                      ARATHA SIGNED
                    </span>
                  </div>
                  <div className="flex flex-col text-[10px]">
                    <span className="font-bold text-white print:text-black">Aratha Solutions Director</span>
                    <span className="text-slate-500 print:text-slate-600">Digital Scoping Lead</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-end gap-3 print:hidden">
              <button
                onClick={() => setShowProposalModal(false)}
                className="px-4.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-white/10"
              >
                Close View
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all shadow-lg"
              >
                Save Official PDF Proposal
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
