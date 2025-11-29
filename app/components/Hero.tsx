// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import gsap from "gsap";
import TypingText from "./TypingText";

export default function Hero() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const handleContact = useCallback(() => {
    router.push("/#contact");
  }, [router]);

  useEffect(() => {
    if (!rootRef.current) return;

    // use gsap context for React-safe scoping + cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // fade/slide in for text block
      tl.from(
        ".hero-badge, .hero-title, .hero-desc, .hero-ctas, .hero-tech, .hero-social",
        {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      // image pop + slight rotate
      tl.from(
        imageRef.current,
        {
          scale: 0.96,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-20 px-6 lg:px-12"
      id="home"
      aria-label="Hero"
    >
      <div className="max-w-[1200px] mx-auto grid gap-6 2xl:gap-10 lg:grid-cols-12 items-center">
        {/* Left / Content */}
        <div className="lg:col-span-7">
          <p className="hero-badge inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 text-sm font-medium text-[var(--color-heading)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] inline-block" />
            Available for Frontend Roles & Shopify Projects
          </p>

          <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[56px] font-[var(--font-poppins)] leading-tight tracking-tight text-[var(--color-heading)]">
            Hi — I’m{" "}
            <span className="text-[var(--color-primary)] font-medium">
              Jillur Rahman
            </span>
            , a front-end developer building fast, conversion-focused Shopify
            & Next.js storefronts
          </h1>

          <p className="hero-desc mt-6 text-lg max-w-2xl text-[var(--color-text)]">
            I bridge the gap between design and development for agencies,
            brands, and product teams. Using React, Next.js, GSAP, and Shopify,
            I build accessible, app-like experiences that look premium and
            perform flawlessly across all devices.
          </p>

          <div className="hero-ctas mt-8 flex flex-wrap gap-3 items-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-primary)] text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
            >
              View my work
            </Link>

            <button
              onClick={handleContact}
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 bg-transparent border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-slate-50 dark:hover:bg-slate-800/60 focus:outline-none"
            >
              Let’s work together
            </button>
          </div>
          {/* Tech badges */}
          <div className="hero-tech mt-8 flex flex-wrap items-center gap-3">
            {[
              "React",
              "Next.js",
              "JavaScript",
              "GSAP",
              "Shopify",
              "Vercel",
            ].map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] inline-block" />
                <span className="text-[var(--color-text)]">{tech}</span>
              </div>
            ))}
          </div>

          {/* Social / quick links using react-icons */}
          <div className="hero-social mt-8 flex items-center gap-4">
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

        {/* Right / Visual */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div
            ref={imageRef}
            className="relative w-80 h-80 sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md overflow-hidden"
            aria-hidden
          >
            <Image
              src="/banner-image.png"
              alt="Profile photo"
              fill
              draggable="false"
              sizes="(max-width: 1024px) 360px, 420px"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.06)] dark:to-[rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </div>

      {/* Decorative bottom stripe */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-transparent to-[var(--color-bg)]" />
    </section>
  );
}
