"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaPencilAlt,
  FaBriefcase,
  FaComments,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaBars,
  FaTimes,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import TypingText from "./TypingText";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const firstNavRef = useRef<HTMLAnchorElement | null>(null);

  const nav = [
    { href: "#home", label: "Home", icon: <FaHome /> },
    { href: "#about", label: "About", icon: <FaUser /> },
    { href: "#projects", label: "Projects", icon: <FaBriefcase /> },
    { href: "#testimonials", label: "Testimonial", icon: <FaComments /> },
    { href: "#blog", label: "Blog", icon: <FaFileAlt /> },
    { href: "#experience", label: "Experience", icon: <FaPencilAlt /> },
    { href: "#contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // 🔹 Smooth scroll behavior (global)
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // 🔹 Intersection Observer for active section highlighting
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0,
    };

    nav.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(id);
        });
      }, options);
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [nav]);

  // 🔹 Close panel on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // 🔹 Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* 🔸 Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm"
        >
          <FaBars />
        </button>
      </div>

      {/* 🔸 Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-80 md:flex-col md:justify-between border-r border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm z-50">
        {/* Profile */}
        <div className="flex flex-col items-center py-8 px-6 border-b border-[var(--color-border)]">
          <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-[var(--color-border)]">
            <img
              src="/avator.png"
              alt="Profile"
              draggable="false"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-5 text-center">
            <h2 className="text-xl font-semibold text-[var(--color-heading)]">
              Jillur Rahman
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              <TypingText
                words={["Front-End", "ReactJS", "Next.js", "Shopify"]}
              />{" "}
              Developer
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav
          className="px-8 pb-6 flex items-center justify-center w-full h-full max-h-fit"
          aria-label="Main navigation"
        >
          <ul className="space-y-1 w-full h-fit">
            {nav.map((item, i) => {
              const isActive = activeId === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    ref={i === 0 ? firstNavRef : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 bg-[var(--color-bg)] hover:bg-[var(--color-primary)]/10 ring-1 ring-[var(--color-border)] hover:ring-[var(--color-primary)]
                        ${
                          isActive
                            ? "bg-[var(--color-primary)]/10 ring-[var(--color-primary)] text-[var(--color-heading)] font-semibold"
                            : "hover:bg-[var(--color-bg)] text-[var(--color-text)]"
                        }`}
                  >
                    <span
                      className={`text-lg transition-all duration-300 group-hover:text-[var(--color-primary)] ${
                        isActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-text)]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="px-6 py-4 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaGithub />
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
      </aside>

      {/* 🔸 Mobile Slide-in Nav */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-3/4 max-w-xs bg-[var(--color-surface)] border-r border-[var(--color-border)] transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border)]">
              <img
                src="/avator.png"
                alt="Profile"
                draggable="false"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--color-heading)]">
                Jillur Rahman
              </div>
              <div className="text-xs text-[var(--color-muted)]">Front-End</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const isActive = activeId === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition text-[var(--color-text)] ${
                      isActive
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-bg)]"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="size-8 rounded-full flex justify-center items-center border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
            >
              <FaGithub />
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
        </nav>
      </div>
    </>
  );
}
