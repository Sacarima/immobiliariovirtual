import React from "react";
import Footer from '../components/Footer'

const BRAND = "#041337"; 
const BRAND2 = "#C85F31";

export default function ServicesImmobiliaVirtual() {
  return (
    <main
      className="relative min-h-screen bg-white text-gray-900"
      style={{ "--brand": BRAND, "--brand2": BRAND2 }}
    >
      {/* Decorative background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 300px at 50% -10%, rgba(0,179,155,0.08), transparent 60%), radial-gradient(540px 240px at 85% 120%, rgba(200,95,49,0.10), transparent 60%)",
        }}
      />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur">
              <Dot /> Services
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Everything you need to move <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">with confidence</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base/7 md:text-lg/8 max-w-prose">
              From discovery to decision, immobilia‑virtual combines the largest listing base with data‑driven insights and trusted professionals to help you buy, sell, or rent.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/search"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
              >
                Start searching <Arrow />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition hover:border-gray-300 active:scale-95"
              >
                Talk to an expert
              </a>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Stat label="Active listings" value="1.2M+" />
            <Stat label="Cities & towns" value="900+" />
            <Stat label="Monthly readers" value="3.5M+" />
            <Stat label="Pro partners" value="6k+" />
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeader
          title="Core services"
          subtitle="Built around real needs—search smarter, decide faster, and move with clarity."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<SearchIcon />} title="Buy & rent search" desc="Explore houses, flats, and land across Poland with powerful filters, maps, and alerts." linkText="Browse listings" href="/search" />
          <FeatureCard icon={<PriceIcon />} title="Sell & valuation" desc="Benchmark your asking price with current market data and get guidance for a faster sale." linkText="See pricing data" href="/insights/prices" />
          <FeatureCard icon={<BookIcon />} title="Guides & reports" desc="Step‑by‑step advice for buyers, sellers, and renters, plus monthly market reports." linkText="Read the latest" href="/insights" />
          <FeatureCard icon={<HandshakeIcon />} title="Trusted pros" desc="Connect with vetted agents, developers, and property managers for expert support." linkText="Find a pro" href="/professionals" />
          <FeatureCard icon={<BellIcon />} title="Alerts & saved" desc="Save searches and receive instant alerts when matching properties hit the market." linkText="Create an alert" href="/account/saved" />
          <FeatureCard icon={<ShieldIcon />} title="Renter tools" desc="Navigate leases confidently with checklists, templates, and neighborhood insights." linkText="See renter tools" href="/renters" />
        </div>
      </section>

      {/* SOLUTIONS BY AUDIENCE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeader title="Solutions for everyone" subtitle="Tailored paths whether you're buying, renting, selling, or building." />
        <div className="grid gap-6 md:grid-cols-3">
          <AudienceCard
            title="Buyers & renters"
            points={["Largest listing base in PL", "Neighborhood and commute insights", "Saved searches & instant alerts"]}
            cta={{ label: "Start searching", href: "/search" }}
          />
          <AudienceCard
            title="Sellers & landlords"
            points={["Price benchmarking & comps", "Pro photography & staging tips", "Promoted placements for reach"]}
            cta={{ label: "List your property", href: "/sell" }}
          />
          <AudienceCard
            title="Agents & developers"
            points={["High‑intent leads", "Analytics & reporting", "Brand placements & API access"]}
            cta={{ label: "Partner with us", href: "/partners" }}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeader title="How it works" subtitle="A simple flow from discovery to decision." />
        <ol className="relative border-l border-gray-200">
          {[
            { title: "Set your goals", desc: "Define budget, location, and must‑haves. We'll keep things tailored." },
            { title: "Search & shortlist", desc: "Use filters, maps, and alerts to narrow options. Save and compare." },
            { title: "View & evaluate", desc: "Schedule viewings and review data—price trends, comps, and tips." },
            { title: "Decide & move", desc: "Lean on trusted pros and checklists to close with confidence." },
          ].map((s, i) => (
            <li key={i} className="mb-8 ml-6">
              <span className="absolute -left-3 mt-1 h-6 w-6 rounded-full border border-gray-200 bg-white grid place-items-center text-xs font-semibold" style={{ color: "var(--brand)" }}>{i + 1}</span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-gray-600 max-w-prose">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* INSIGHTS CALLOUT */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Make data your advantage</h3>
            <p className="mt-1 text-gray-600">Track asking prices, inventory, and time­‑to‑sell across Poland with our monthly indices and open data.</p>
          </div>
          <a
            href="/insights"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition active:scale-95"
            style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
          >
            Explore insights <Arrow />
          </a>
        </div>
      </section>

      {/* FAQ SNIPPET */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeader title="Common questions" subtitle="Quick answers about services and features." />
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {[
            { q: "Is immobilia‑virtual free to use?", a: "Browsing listings and reading insights are free. Optional promoted placements and pro tools are paid." },
            { q: "How do alerts work?", a: "Save a search and choose frequency. We email you when new listings match your criteria." },
            { q: "Do you offer valuation help?", a: "We provide pricing data and comps to benchmark. For an appraisal, connect with our trusted pros." },
          ].map((item, i) => (
            <details key={i} className="group p-4 open:bg-gray-50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-medium">
                <span>{item.q}</span>
                <span className="shrink-0 h-6 w-6 grid place-items-center rounded-full border border-gray-200 bg-white">
                  <Chevron />
                </span>
              </summary>
              <p className="mt-2 text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm md:grid-cols-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Let’s get you moving</h3>
            <p className="mt-2 text-gray-600 max-w-prose">Reach out for tailored recommendations, partnership options, or help listing your property.</p>
          </div>
          <div className="grid gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-3"><MailIcon /><a className="hover:underline" href="mailto:hello@immobilia-virtual.com">hello@immobilia-virtual.com</a></div>
            <div className="flex items-start gap-3"><LinkIcon /><a className="hover:underline" href="/partners">Partner with us</a></div>
            <div className="flex items-start gap-3"><Dot /><a className="hover:underline" href="/newsletter">Join the newsletter</a></div>
            <div className="flex items-start gap-3"><MapPinIcon /><span>Warsaw • Kraków • Remote‑first</span></div>
          </div>
        </div>
      </section>

      <div className="h-8" />
      <Footer />
    </main>
  );
}

/* ——— Subcomponents ——— */
function SectionHeader({ title, subtitle }) {
  return (
    <header className="mb-8 sm:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">{title}</span>
      </h2>
      {subtitle && <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>}
    </header>
  );
}

function FeatureCard({ icon, title, desc, linkText, href = "#" }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(180deg, var(--brand)/.12, var(--brand2)/.12)" }}>
        <span className="text-[color:var(--brand)]">{icon}</span>
      </div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
      <a href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)] hover:underline">
        {linkText} <ArrowSmall />
      </a>
    </div>
  );
}

function AudienceCard({ title, points = [], cta }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-gray-700">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2"><Dot />{p}</li>
        ))}
      </ul>
      {cta && (
        <a
          href={cta.href}
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition active:scale-95"
          style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
        >
          {cta.label} <Arrow />
        </a>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <div className="text-lg font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

/* ——— Inline icons ——— */
function Arrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}
function ArrowSmall() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h10" /><path d="M12 7l5 5-5 5" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M20 22V5a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 5.5v14" />
    </svg>
  );
}
function PriceIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 12h.01" /><path d="M20 7h-4l-4 4-4-4H4l8 8 8-8Z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)" }} />;
}
