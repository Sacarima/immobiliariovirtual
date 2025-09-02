import React from "react";
import realEstate from '../assets/realstat.jpeg'
import Footer from '../components/Footer'


const BRAND = "#041337";   
const BRAND2 = "#C85F31";   

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
    <defs>
      <linearGradient id='g' x1='0' x2='1'>
        <stop offset='0' stop-color='${BRAND}' stop-opacity='.2'/>
        <stop offset='1' stop-color='${BRAND2}' stop-opacity='.2'/>
      </linearGradient>
    </defs>
    <rect width='800' height='500' fill='url(#g)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='Inter, ui-sans-serif' font-size='20'>Image Placeholder</text>
  </svg>`);

export default function AboutImmobiliaVirtual() {
  return (
    <main
      className="relative min-h-screen bg-white text-gray-900"
      style={{ "--brand": BRAND, "--brand2": BRAND2 }}
    >
      {/* Decorative page aura */}
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
              <Dot /> Since 2023 — Trusted real‑estate insights
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              About <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">immobilia‑virtual</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base/7 md:text-lg/8">
              We make the Polish property market transparent and accessible. From the largest listing base to data‑driven reports and expert guidance, we help people buy, sell, and rent with confidence.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#mission"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
              >
                Our mission <Arrow />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition hover:border-gray-300 active:scale-95"
              >
                Contact us
              </a>
            </div>

            {/* Trust bar */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6 text-sm text-gray-500">
              <Stat label="Listings" value="1.2M+" />
              <Stat label="Cities & towns" value="900+" />
              <Stat label="Monthly readers" value="3.5M+" />
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
              <img src={realEstate} alt="A collage of homes, apartments, and city skylines" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section id="mission" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Our mission</h2>
            <p className="mt-3 text-gray-600">
              Empower people to make informed, confident decisions in the real‑estate market by combining reliable data, human expertise, and intuitive tools.
            </p>
            <ul className="mt-5 grid gap-3 text-gray-700">
              <li className="flex items-start gap-3"><Badge>01</Badge><span>Open market data and actionable insights for everyone.</span></li>
              <li className="flex items-start gap-3"><Badge>02</Badge><span>Practical guidance—from search strategies to viewings to closing.</span></li>
              <li className="flex items-start gap-3"><Badge>03</Badge><span>Fairness and clarity for buyers, sellers, renters, and professionals.</span></li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Our values</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Value icon={<ShieldIcon />} title="Integrity" desc="We publish objective, verified information and stand by it." />
              <Value icon={<ChartIcon />} title="Evidence‑driven" desc="We analyze trends, not anecdotes—turning data into clarity." />
              <Value icon={<SparkIcon />} title="Practicality" desc="Useful over flashy. Every feature solves a real problem." />
              <Value icon={<HeartIcon />} title="Empathy" desc="Homes are personal. We design with people, not just users." />
            </div>
          </Card>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <header className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">What we do</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">From discovery to decision, immobilia‑virtual provides the tools and knowledge that make real‑estate journeys easier.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<SearchIcon />} title="Smart search" desc="Find houses, flats, and land across Poland with powerful filters and maps." />
          <Feature icon={<BookIcon />} title="Guides & reports" desc="Step‑by‑step advice and in‑depth market reports to navigate with confidence." />
          <Feature icon={<PriceIcon />} title="Pricing data" desc="Up‑to‑date asking prices and indices to benchmark your decisions." />
          <Feature icon={<HandshakeIcon />} title="Trusted pros" desc="Connect with vetted agents, developers, and property managers." />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Our journey</h2>
        </header>
        <ol className="relative border-l border-gray-200">
          {[
            { year: "2023", title: "Launched immobilia‑virtual", body: "Began with a mission to simplify property decisions in Poland." },
            { year: "2024", title: "Open data & reports", body: "Introduced monthly indices and expert commentary for buyers and sellers." },
            { year: "2025", title: "Insights platform", body: "Rolling out tools that personalize recommendations and improve search quality." },
          ].map((e, i) => (
            <li key={i} className="mb-8 ml-6">
              <span className="absolute -left-3 mt-1 h-6 w-6 rounded-full border border-gray-200 bg-white grid place-items-center text-xs font-semibold" style={{ color: "var(--brand)" }}>{i + 1}</span>
              <h3 className="text-lg font-semibold">{e.year} • {e.title}</h3>
              <p className="mt-1 text-gray-600">{e.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <header className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Team</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">A small, focused team of engineers, researchers, and designers building with purpose.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Alex Nowak", role: "CEO & Co‑founder" },
            { name: "Marta Lewandowska", role: "Head of Research" },
            { name: "Piotr Zieliński", role: "Design Lead" },
            { name: "Joanna Kowalska", role: "Data Engineer" },
            { name: "Tomasz Wiśniewski", role: "Product Manager" },
            { name: "You?", role: "We’re hiring" },
          ].map((t, i) => (
            <div key={i} className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 grid place-items-center text-sm font-semibold text-gray-600">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm md:grid-cols-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Join our newsletter
            </h3>
            <p className="mt-2 text-gray-600">Monthly market signals, fresh listings intel, and practical guides—straight to your inbox.</p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition active:scale-95"
              style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand2))" }}
            >
              Subscribe <Arrow />
            </a>
          </div>

          <div className="grid gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-3"><MapPinIcon /><span>Warsaw • Kraków • Remote‑first</span></div>
            <div className="flex items-start gap-3"><MailIcon /><a className="hover:underline" href="mailto:hello@immobilia-virtual.com">hello@immobilia-virtual.com</a></div>
            <div className="flex items-start gap-3"><LinkIcon /><a className="hover:underline" href="/careers">Careers</a></div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-8" />
      <Footer />
    </main>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      {children}
    </div>
  );
}

function Value({ icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(180deg, var(--brand)/.1, var(--brand2)/.1)" }}>
        <span className="text-[color:var(--brand2)]">{icon}</span>
      </div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(180deg, var(--brand)/.12, var(--brand2)/.12)" }}>
        <span className="text-[color:var(--brand)]">{icon}</span>
      </div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
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

function Badge({ children }) {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700">
      {children}
    </span>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)" }} />;
}

/* Simple inline icons (SVG) */
function Arrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
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
function ChartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" /><path d="M19 9l-5 5-4-4-3 3" />
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
function SparkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3v4M3 5h4" /><path d="M19 13v4M17 15h4" /><path d="M11 21v-6M8 18h6" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
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
