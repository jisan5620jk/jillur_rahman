"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaGithubAlt, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    null | "idle" | "sending" | "success" | "error"
  >(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        console.error("Subscribe error:", data);
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  }

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 items-start">
        {/* Brand + social */}
        <div>
          <Link
            href="/"
            className="inline-block text-lg font-[var(--font-poppins)] text-[var(--color-heading)]"
          >
            {/* Replace with your brand/logo */}
            Jillur Rahman
          </Link>

          <p className="mt-3 text-sm text-[var(--color-muted)] max-w-sm">
            I build performant, accessible web apps. Available for freelance &
            contract work.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaGithubAlt />
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://instagram.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav
          aria-label="Footer navigation"
          className="text-sm text-[var(--color-text)]"
        >
          <h4 className="font-medium text-[var(--color-heading)]">Explore</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/#projects"
                className="hover:text-[var(--color-primary)]"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-[var(--color-primary)]"
              >
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[var(--color-primary)]">
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="hover:text-[var(--color-primary)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter / Theme toggle */}
        <div>
          <h4 className="font-medium text-[var(--color-heading)]">
            Stay updated
          </h4>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            Get occasional updates about projects and writing.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex gap-2"
            aria-label="Subscribe form"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="flex-1 px-3 py-2 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md bg-[var(--color-primary)] text-white font-medium"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </form>

          <div className="mt-3 text-xs">
            {status === "success" && (
              <span className="text-green-600">Thanks — check your inbox.</span>
            )}
            {status === "error" && (
              <span className="text-red-500">
                Something went wrong — try again.
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="text-xs text-[var(--color-muted)]">
              © {new Date().getFullYear()} Jillur Rahman
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
