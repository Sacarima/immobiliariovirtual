import React, { useMemo, useState, useRef } from 'react'
import Footer from '../components/Footer'

const BRAND = '#041337'
const BRAND2 = '#C85F31'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General', message: '' })
  const [consent, setConsent] = useState(true)
  const [hp, setHp] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const mounted = useRef(true)

  React.useEffect(() => () => { mounted.current = false }, [])

  const emailId = useMemo(() => 'email-' + Math.random().toString(36).slice(2, 8), [])
  const nameId = useMemo(() => 'name-' + Math.random().toString(36).slice(2, 8), [])
  const phoneId = useMemo(() => 'phone-' + Math.random().toString(36).slice(2, 8), [])
  const subjectId = useMemo(() => 'subject-' + Math.random().toString(36).slice(2, 8), [])
  const messageId = useMemo(() => 'message-' + Math.random().toString(36).slice(2, 8), [])

  function isEmail(v) { return /.+@.+\..+/.test(v || '') }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (hp) return // bot
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!isEmail(form.email)) return setError('Please enter a valid email address.')
    if (!form.message.trim()) return setError('Please enter your message.')
    if (!consent) return setError('Please accept the privacy terms to continue.')

    try {
      setStatus('loading')
      // Replace with your real endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent }),
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to send message')
      if (!mounted.current) return
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: 'General', message: '' })
      setConsent(true)
    } catch (err) {
      if (!mounted.current) return
      setStatus('error')
      setError(err?.message || 'Something went wrong. Try again.')
    }
  }

  return (
    <main
      className="relative bg-white text-gray-900"
      style={{ ['--brand']: BRAND, ['--brand2']: BRAND2 }}
    >
      {/* Decorative aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 300px at 50% -10%, rgba(0,179,155,0.08), transparent 60%), radial-gradient(540px 240px at 85% 120%, rgba(200,95,49,0.10), transparent 60%)',
        }}
      />

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 lg:pt-28 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur">
          <Dot /> Contact Us
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Get in touch with <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand2)] bg-clip-text text-transparent">immobilia‑virtual</span>
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">We’d love to hear from you. Send us a message and our team will respond as soon as possible.</p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: Info */}
          <aside className="lg:col-span-2 space-y-5">
            <InfoCard
              title="Email"
              desc={<a href="mailto:hello@immobilia-virtual.com" className="hover:underline">hello@immobilia-virtual.com</a>}
              icon={<MailIcon />}
            />
            <InfoCard
              title="Locations"
              desc={<span>Warsaw • Kraków • Remote‑first</span>}
              icon={<MapPinIcon />}
            />
            <InfoCard
              title="Press & partnerships"
              desc={<a href="/partners" className="hover:underline">Press kit & inquiries</a>}
              icon={<LinkIcon />}
            />

            {/* Hours */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="font-medium">Office hours</p>
              <ul className="mt-2 text-sm text-gray-700">
                <li>Mon–Fri: 9:00–17:00</li>
                <li>Sat–Sun: Closed</li>
              </ul>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <SuccessCard message="Thank you! Your message has been sent. We'll get back to you soon." />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* honeypot */}
                  <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Your name" htmlFor={nameId}>
                      <input
                        id={nameId}
                        type="text"
                        placeholder="e.g., Anna Kowalska"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                      />
                    </Field>

                    <Field label="Your email" htmlFor={emailId}>
                      <input
                        id={emailId}
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        aria-invalid={error && !isEmail(form.email) ? 'true' : 'false'}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand2)] focus:ring-2 focus:ring-[color:var(--brand2)]/30"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone (optional)" htmlFor={phoneId}>
                      <input
                        id={phoneId}
                        type="tel"
                        placeholder="+48 600 000 000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                      />
                    </Field>

                    <Field label="Subject" htmlFor={subjectId}>
                      <select
                        id={subjectId}
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand2)] focus:ring-2 focus:ring-[color:var(--brand2)]/30"
                      >
                        <option>General</option>
                        <option>Listings</option>
                        <option>Partnership</option>
                        <option>Press</option>
                        <option>Support</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Your message" htmlFor={messageId}>
                    <textarea
                      id={messageId}
                      rows={6}
                      placeholder="How can we help?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/30"
                    />
                  </Field>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[color:var(--brand)] focus:ring-[color:var(--brand)] accent-[#C85F31]"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to the processing of my data according to the
                      <a href="#privacy" className="mx-1 font-medium text-[color:var(--brand)] hover:underline">privacy policy</a>.
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-red-600">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-white font-medium shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
                    style={{ backgroundImage: 'linear-gradient(90deg, var(--brand), var(--brand2))' }}
                  >
                    {status === 'loading' ? (
                      <span className="inline-flex items-center gap-2">Sending <Spinner /></span>
                    ) : (
                      <span>Send message</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="h-6" />

      <Footer />
    </main>
  )
}

/* ——— Subcomponents ——— */
function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {label}
      {children}
    </label>
  )
}

function SuccessCard({ message }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
      <p className="font-medium text-green-800">Message sent</p>
      <p className="mt-1 text-sm text-green-700">{message}</p>
    </div>
  )
}

function InfoCard({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(180deg, var(--brand)/.12, var(--brand2)/.12)' }}>
        <span className="text-[color:var(--brand2)]">{icon}</span>
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-700">{desc}</p>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
    </svg>
  )
}

/* Icons */
function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
}
function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" />
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
    </svg>
  )
}
