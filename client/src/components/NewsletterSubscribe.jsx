import React, { useMemo, useRef, useState } from "react";

/**
 * NewsletterSubscribe – modern, accessible subscription card
 * ---------------------------------------------------------
 * - Plain React (no TS), TailwindCSS classes
 * - Keyboard accessible, proper labels, aria-live updates
 * - Lightweight validation + honeypot field to deter bots
 * - Subtle micro‑animations (focus ring, button press, success check)
 * - Brandable via props (default uses #00b39b and #C85F31)
 *
 * Props
 * -----
 * title?: string
 * description?: string
 * successMessage?: string
 * onSubscribe?: (payload: { email: string; name?: string; consent: boolean }) => Promise<void>
 * brand?: string  // primary accent (e.g., #00b39b)
 * brand2?: string // secondary accent (e.g., #C85F31)
 */

export default function NewsletterSubscribe({
  title = "Get market insights in your inbox",
  description =
    "Join our monthly newsletter for the freshest Polish housing market data, expert commentary, and product updates.",
  successMessage = "You're in! Please check your inbox to confirm.",
  onSubscribe,
  brand = "#041337",
  brand2 = "#C85F31",
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const emailId = useMemo(() => "email-" + Math.random().toString(36).slice(2, 8), []);
  const nameId = useMemo(() => "name-" + Math.random().toString(36).slice(2, 8), []);
  const consentId = useMemo(() => "consent-" + Math.random().toString(36).slice(2, 8), []);

  const mounted = useRef(true);

  function isValidEmail(v) {
    // simple, user-friendly email check (no RFC wall)
    return /.+@.+\..+/.test(v);
  }

  async function defaultSubscribe(payload) {
    // Example API call – replace with your endpoint
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(t || "Subscription failed");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (hp) return; // bot trap
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please accept the privacy terms to continue.");
      return;
    }

    try {
      setStatus("loading");
      const subscribe = onSubscribe || defaultSubscribe;
      await subscribe({ email: email.trim(), name: name.trim() || undefined, consent });
      if (!mounted.current) return;
      setStatus("success");
    } catch (err) {
      if (!mounted.current) return;
      setStatus("error");
      setError(err?.message || "Something went wrong. Try again.");
    }
  }

  React.useEffect(() => () => { mounted.current = false; }, []);

  return (
    <section
      className="relative mx-auto w-full px-4 sm:px-6 py-20"
      style={{
        ["--brand"]: brand,
        ["--brand2"]: brand2,
      }}
    >
      {/* decorative aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(600px 200px at 50% -10%, rgba(0,179,155,0.08), transparent 60%), radial-gradient(420px 180px at 85% 120%, rgba(200,95,49,0.10), transparent 60%)",
        }}
      />

      <div className="overflow-hidden rounded-2xl border-[.5px] border-gray-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-5">
          {/* Copy */}
          <div className="md:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">
                {title}
              </span>
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">{description}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Dot />No spam. Unsubscribe anytime.</li>
              <li className="flex items-center gap-2"><Dot />Monthly digest • hand‑picked insights</li>
              <li className="flex items-center gap-2"><Dot />Polish market data & expert tips</li>
            </ul>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {status === "success" ? (
              <SuccessCard message={successMessage} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor={nameId} className="text-sm font-medium text-gray-700">
                      First name (optional)
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      inputMode="text"
                      autoComplete="given-name"
                      placeholder="e.g., Anna"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor={emailId} className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      aria-invalid={error && !isValidEmail(email) ? "true" : "false"}
                      aria-describedby={error ? emailId + "-error" : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand2)] focus:ring-2 focus:ring-[color:var(--brand2)]/30"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id={consentId}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                  />
                  <label htmlFor={consentId} className="text-sm text-gray-600">
                    I agree to receive the newsletter and accept the
                    <a href="#privacy" className="mx-1 font-medium text-[color:var(--brand)] hover:underline">privacy policy</a>.
                  </label>
                </div>

                {error && (
                  <p id={emailId + "-error"} role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white font-medium shadow-sm transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, var(--brand), var(--brand2))",
                    }}
                  >
                    <span className="pr-1">Subscribe</span>
                    {status === "loading" ? (
                      <Spinner className="ml-2" />
                    ) : (
                      <Arrow />
                    )}
                  </button>

                  <p className="text-xs text-gray-500" aria-live="polite">
                    We’ll send a confirmation email.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessCard({ message }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
      <Check />
      <div>
        <p className="font-medium text-green-800">Subscribed</p>
        <p className="text-sm text-green-700 mt-0.5">{message}</p>
      </div>
    </div>
  );
}

function Spinner({ className = "" }) {
  return (
    <svg className={`h-5 w-5 animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true" role="status">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  );
}

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)" }} />;
}

