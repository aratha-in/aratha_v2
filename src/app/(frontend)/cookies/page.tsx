export const metadata = {
  title: "Cookie Policy | Analytics & Tracking | Aratha",
  description: "Read about how Aratha utilizes browser cookies to manage client portal sessions and tracking tags.",
};

export default function CookiesPage() {
  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      <div className="glow-blob bg-accent top-10 left-10 opacity-10" />

      <div className="flex flex-col gap-8 relative z-10 text-slate-300">
        <div>
          <span className="text-[10px] font-bold uppercase text-accent tracking-widest font-mono">Legal Agreements</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Cookie Policy</h1>
          <p className="text-slate-500 text-xs mt-1">Last Updated: August 05, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-xs leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">1. Use of Cookies</h2>
            <p>
              Cookies are small text file tokens stored on your device when you load our pages. We utilize cookies to manage secure logins inside the Client Portal and preserve pricing calculator state choices.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">2. Categorization of Session Tokens</h2>
            <p>
              &bull; **Essential Cookies**: Necessary to authenticate guest roles and access Client Portal dashboards.
            </p>
            <p>
              &bull; **Performance & Analytics**: Used to track page views load metrics, sitemaps errors, and Lighthouse compliance.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white">3. Setting Adjustments</h2>
            <p>
              You can adjust browser configurations to reject cookies or warn before acceptance. Note that disabling essential cookies will disable access to the secure Client Portal sections.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
