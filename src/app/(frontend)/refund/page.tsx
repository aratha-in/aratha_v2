export const metadata = {
  title: "Refund Policy | Billing Milestones | Aratha",
  description: "Read the Aratha billing refund policies concerning project deposits, milestone acceptance, and maintenance support retainers.",
};

export default function RefundPage() {
  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      <div className="glow-blob bg-accent top-10 left-10 opacity-10" />

      <div className="flex flex-col gap-8 relative z-10 text-slate-300">
        <div>
          <span className="text-[10px] font-bold uppercase text-accent tracking-widest font-mono">Legal Agreements</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Refund Policy</h1>
          <p className="text-slate-500 text-xs mt-1">Last Updated: August 05, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-xs leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">1. Deposit Payments</h2>
            <p>
              Upfront 50% deposits cover technical scoping strategy analysis and wireframing designs. Deposits are non-refundable once strategy mappings are delivered.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">2. Development Milestones</h2>
            <p>
              Payments for completed development phases (e.g., Next.js frontend code assemblies, database connections) are reviewed and approved on staging platforms. Once approved and signed off, milestone payments are non-refundable.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">3. Retainers & Support SLAs</h2>
            <p>
              Monthly maintenance SLA retainers and hosting services can be terminated by providing a 30-day written cancellation notice. Refund values are prorated based on the remaining days of the current monthly billing cycle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
