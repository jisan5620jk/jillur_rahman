// components/Contact.tsx
"use client";

import { FaEnvelope, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      className="py-20 px-6 lg:px-12"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 contact-card rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-sm">
          <h2
            id="contact-heading"
            className="contact-heading text-2xl font-[var(--font-poppins)] text-[var(--color-heading)] flex items-center gap-3"
          >
            <FaEnvelope className="text-[var(--color-primary)]" /> Get in touch
          </h2>

          <p className="mt-4 text-[var(--color-text)] font-[var(--font-inter)]">
            I’m open to freelance & contract opportunities. Tell me about your
            project and I’ll get back within 48 hours.
          </p>

          <div className="mt-6 text-sm text-[var(--color-muted)] space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[var(--color-primary)]" />
              <span>Dhaka, Bangladesh</span>
            </div>

            <div>
              <strong>Email</strong>
              <div className="text-[var(--color-text)]">
                jisank5620@gmail.com
              </div>
            </div>

            <div>
              <strong>Availability</strong>
              <div className="text-[var(--color-text)]">
                Open for freelance — 15 hrs/week
              </div>
            </div>
          </div>
        </div>

        <form
          className="lg:col-span-7 contact-form rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shadow-sm"
          aria-describedby="contact-desc"
        >
          <div id="contact-desc" className="sr-only">
            Contact form: name, email and message. All messages go to site owner
            via API route.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-[var(--color-heading)]">
                Name
              </span>
              <input
                type="text"
                name="name"
                className="mt-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
                aria-required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-[var(--color-heading)]">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="mt-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
                aria-required
              />
            </label>
          </div>

          {/* Honeypot (hidden) */}
          <div style={{ display: "none" }}>
            <label>Do not fill this out</label>
            <input name="website" />
          </div>

          <label className="block mt-4">
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Message
            </span>
            <textarea
              name="message"
              rows={6}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
              aria-required
            />
          </label>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-[var(--color-primary)] text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none disabled:opacity-60"
            >
              <FaPaperPlane />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 bg-transparent border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 text-xs text-[var(--color-muted)]">
            By sending this message you agree to be contacted. Prefer email?{" "}
            <a
              href="mailto:jisank5620@gmail.com"
              className="text-[var(--color-primary)] hover:underline"
            >
              jisank5620@gmail.com
            </a>
            .
          </div>
        </form>
      </div>
    </section>
  );
}
