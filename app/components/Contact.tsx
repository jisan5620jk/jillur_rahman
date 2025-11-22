// components/Contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaEnvelope, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".contact-heading", { y: -12, opacity: 0, duration: 0.45 });
      tl.from(
        ".contact-card, .contact-form",
        { y: 12, opacity: 0, duration: 0.6, stagger: 0.06 },
        "-=0.2"
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  function validate() {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!message.trim() || message.trim().length < 10)
      return "Message should be at least 10 characters.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      // likely bot — silently return success
      setState("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setState("error");
      return;
    }

    setState("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setState("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage(
          data?.error || "Failed to send message. Try again later."
        );
        setState("error");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again later.");
      setState("error");
    }
  }

  return (
    <section
      ref={rootRef}
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
          ref={formRef}
          onSubmit={handleSubmit}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
                aria-required
              />
            </label>
          </div>

          {/* Honeypot (hidden) */}
          <div style={{ display: "none" }}>
            <label>Do not fill this out</label>
            <input
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <label className="block mt-4">
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Message
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
              aria-required
            />
          </label>

          <div className="mt-4 min-h-[1.25rem]">
            {state === "error" && errorMessage && (
              <div
                className="text-sm text-red-500"
                role="status"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            )}

            {state === "success" && (
              <div
                className="text-sm text-green-600"
                role="status"
                aria-live="polite"
              >
                Thanks — your message was sent. I’ll get back to you soon!
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-[var(--color-primary)] text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none disabled:opacity-60"
              disabled={state === "sending"}
            >
              <FaPaperPlane />
              {state === "sending" ? "Sending…" : "Send message"}
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setMessage("");
                setState("idle");
                setErrorMessage(null);
              }}
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
