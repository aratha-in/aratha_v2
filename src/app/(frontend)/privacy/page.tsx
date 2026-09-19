export const metadata = {
  title: "Privacy Policy | Aratha | Your Partner in Market Intelligence",
  description: "Read about how Aratha handles data privacy, client session logs, and personal database assets securely.",
};

export default function PrivacyPage() {
  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      {/* Glow blobs */}
      <div className="glow-blob bg-accent top-10 left-10 opacity-10" />

      <div className="flex flex-col gap-8 relative z-10 text-slate-300">
        <div>
          <span className="text-[10px] font-bold uppercase text-accent tracking-widest font-mono">Legal Agreements</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Privacy Policy</h1>
          <p className="text-slate-500 text-xs mt-1">Last Updated: August 05, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-xs leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">1. Scope of Data Governance</h2>
            <p>
              Aratha Agency is committed to safeguarding personal and business data assets. This Policy describes how we aggregate, store, and secure information collected when clients utilize our pricing calculator platforms, contact forms, and client portal spaces.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">2. Information Collection & Tracking</h2>
            <p>
              We collect information provided directly by you, including corporate names, email addresses, and scoped custom plan selections. Additionally, the Aratha Client Portal stores project schedules, checklist completions, invoice histories, and uploaded design brief files.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">3. Secure Storage Node Protocols</h2>
            <p>
              Your personal credentials are stored behind secure token-based systems. We deploy firewall policies and daily database replication procedures to prevent unauthorized breach injections. Client-side payments are processed directly by encrypted gateways (Stripe, Razorpay, PayPal) and are not cached on Aratha server consoles.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">4. Compliance & Disclosures</h2>
            <p>
              We compile databases in accordance with GDPR and HIPAA regulations. We do not sell or monetize personal database profiles. Data disclosures are made only when required by legal actions or to preserve agency system integrity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
