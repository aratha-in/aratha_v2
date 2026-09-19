export const metadata = {
  title: "Terms & Conditions | Aratha | Your Partner in Market Intelligence",
  description: "Review terms of service agreements, scoping contracts, payment schedules, and client portal usage rules at Aratha.",
};

export default function TermsPage() {
  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      <div className="glow-blob bg-accent top-10 left-10 opacity-10" />

      <div className="flex flex-col gap-8 relative z-10 text-slate-300">
        <div>
          <span className="text-[10px] font-bold uppercase text-accent tracking-widest font-mono">Legal Agreements</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Terms & Conditions</h1>
          <p className="text-slate-500 text-xs mt-1">Last Updated: August 05, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-xs leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">1. Provision of Services</h2>
            <p>
              Aratha offers premium software engineering, website styling designs, local search scoping, and AI automation workflows. Deliverable lists, custom budgets, and schedules are determined by generated proposal contracts and sitemap brief agreements.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">2. Scoping & Payments Agreements</h2>
            <p>
              Standard scopes require a 50% deposit before kickoff and 50% upon QA staging approval. Pricing estimations are valid for 30 days. Payments are logged in client invoices databases and must be paid within 14 days of issue to avoid project hold queues.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">3. Client Portal Usage Rules</h2>
            <p>
              Users are provided login credentials to track project milestones, raise support tickets, and check checklists. You are responsible for safeguarding your access keys. Any suspected compromise must be reported to our support desk immediately.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">4. Intellectual Property Rights</h2>
            <p>
              Upon complete contract payment, the custom source code, sitemaps, styling visual systems, and configuration nodes become the intellectual property of the client. Third-party software assets (Next.js, Tailwind, database engines) are governed by their respective licenses.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
