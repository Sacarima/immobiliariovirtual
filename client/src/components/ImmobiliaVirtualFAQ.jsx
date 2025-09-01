import React, { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * ImmobiliaVirtualFAQ – Modern, accessible Q&A (FAQ) component
 * -------------------------------------------------------------
 * - Responsive and keyboard-accessible
 * - Smooth open/close animation using Framer Motion
 * - Subtle micro‑interactions (chevron rotation, hover/focus rings)
 * - Brand accent color (#00b39b)
 * - Works as multi-open by default; set `accordion` to true for single-open behavior
 *
 * Props:
 * - title?: string
 * - faqs?: Array<{ question: string; answer: string | React.ReactNode }>
 * - accordion?: boolean (default: false)
 */

const BRAND = "#C85F31";

const DEFAULT_FAQS = [
  {
    question: "Why choose immobilia-virtual?",
    answer:
      "immobilia-virtual is the most popular online service supporting the purchase, sale, and rental of real estate. Thanks to our extensive experience and extensive data resources, we understand the needs of our users. We are the number one address in the Polish real estate market, with the largest database of property listings. We support our users in making the most important, life-changing decisions, making the process easier and more convenient.",
  },
  {
    question: "What offers can I find on immobilia-virtual?",
    answer:
      "At immobilia-virtual, we have the largest database of real estate listings in Poland, from both the secondary and primary markets. Everyone can be sure to find something suitable for themselves – a house or apartment, modern or traditional, from an individual, developer, or real estate agency, owned or rented, practical or with character, in a large metropolitan area, a mid-sized town, or perhaps the countryside.",
  },
  {
    question: "What is the current situation on the housing market in Poland?",
    answer:
      "The housing market is subject to very dynamic changes, so it's crucial to stay up-to-date on the market situation, as well as stay up-to-date with current data and expert commentary. Everyone can be sure to find reliable data and objective recommendations here. In fulfilling our mission, we share knowledge, publish numerous reports, publish Lighthouse magazine, comment on the current market situation, and provide information on asking prices in the Polish real estate market. We encourage you to use our open data resources on an ongoing basis to gain clarity on the current market situation, which will undoubtedly help you make informed decisions.",
  },
  {
    question: "How can immobilia-virtual help me find my dream apartment?",
    answer:
      "immobilia-virtual provides advice, reports, and pricing data from various areas of the real estate market. We offer advice on how to search, what to look for when reading listings and viewing properties. We explore rentals — both standard and institutional. We also offer tips on how to find a reliable professional — an agent or developer — who will support you on the challenging path to your dream home. In collaboration with psychologists, we are conducting the 'Happy Home' project, examining the factors that significantly impact whether you feel happy in your home.",
  },
  {
    question: "What is the “Happy Home” project?",
    answer:
      "immobilia-virtual's mission is to strengthen people's confidence in making informed and accurate decisions in the real estate market, ultimately increasing the well-being of Polish residents related to housing. The 'Happy Home' project, launched in 2021, is a cyclical study that examines factors that significantly impact whether we feel happy in our homes. We implement the project with the support of renowned research agencies, psychologists, and economists. Each year, we publish reports that generate significant interest. They help people understand which factors, beyond economic ones, are crucial for making decisions that will help them achieve housing well-being, which is strongly linked to a general sense of happiness.",
  },
];

function useIds(count) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    headerId: `faq-header-${i}`,
    panelId: `faq-panel-${i}`,
  })), [count]);
}

function FaqItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
  headerId,
  panelId,
}) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle(index);
      }
    },
    [index, onToggle]
  );

  return (
    <div
      className={`group border-b border-gray-200 last:border-none ${
        isOpen ? "bg-gray-50" : "bg-white"
      }`}
    >
      <button
        id={headerId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => onToggle(index)}
        onKeyDown={handleKey}
        className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 px-3 sm:px-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl focus-visible:ring-[rgba(0,179,155,0.45)]"
      >
        <span className="text-base sm:text-lg font-medium text-gray-900">
          {question}
        </span>
        <span
          className="shrink-0 grid place-items-center h-9 w-9 rounded-full border border-gray-200 bg-white transition-colors group-hover:border-gray-300"
          style={{ outlineColor: BRAND }}
        >
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-5 pb-5 -mt-1 text-gray-700 leading-relaxed">
              {typeof answer === "string"
                ? answer.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="mb-3">
                      {para}
                    </p>
                  ))
                : answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ImmobiliaVirtualFAQ({
  title = "Frequently asked questions",
  faqs = DEFAULT_FAQS,
  accordion = false,
}) {
  const ids = useIds(faqs.length);
  const [open, setOpen] = useState(() => (accordion ? new Set([0]) : new Set()));

  const isOpen = useCallback((i) => open.has(i), [open]);
  const toggle = useCallback(
    (i) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (accordion) {
          next.clear();
          if (!prev.has(i)) next.add(i);
          return next;
        }
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
    },
    [accordion]
  );

  return (
    <section
      className="relative mx-auto lg:max-w-[60%] px-4 sm:px-6 py-10 sm:py-16"
      style={{
        // decorative gradient halo
        // (kept subtle; remove if undesired)
        ["--brand"]: BRAND,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(600px 200px at 50% -10%, rgba(0,179,155,0.07), transparent 60%)",
        }}
      />

      <header className="mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Immobilia‑Virtual <span className="text-[color:var(--brand)]">FAQ</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Everything you need to know to get the most out of the platform.
        </p>
      </header>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {faqs.map((item, i) => (
          <FaqItem
            key={i}
            index={i}
            question={item.question}
            answer={item.answer}
            isOpen={isOpen(i)}
            onToggle={toggle}
            headerId={ids[i].headerId}
            panelId={ids[i].panelId}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-500">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm"
          title="Interaction hint"
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: BRAND }}
          />
          Click a question to expand
        </span>
        <span className="hidden sm:inline" aria-hidden>
          •
        </span>
        <span className="hidden sm:inline">Press Enter or Space to toggle</span>
      </div>
    </section>
  );
}


