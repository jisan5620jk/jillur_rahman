// components/About.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaDownload, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import gsap from "gsap";
import TypingText from "./TypingText";

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.65, ease: "power3.out" },
      });

      tl.from(leftRef.current, { x: -18, opacity: 0 }).from(
        rightRef.current,
        { x: 18, opacity: 0 },
        "-=0.45"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Skill list with optional proficiency (0-100)
  const skills = [
    { name: "React", level: 92 },
    { name: "Next.js", level: 89 },
    { name: "TypeScript", level: 86 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Node.js", level: 78 },
  ];

  return (
    <section
      ref={rootRef}
      className="py-20 px-6 lg:px-12"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-12 items-center">
        {/* Left: text */}
        <div ref={leftRef} className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <h2
              id="about-heading"
              className="text-2xl font-[var(--font-poppins)] text-[var(--color-heading)]"
            >
              About me
            </h2>
            <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <FaBriefcase /> 4+ years experience
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-[var(--color-text)] font-[var(--font-inter)] text-lg leading-relaxed">
            I’m a front-end developer who loves building performant, accessible,
            and delightful web experiences. I focus on measurable results —
            faster load times, improved conversion, and resilient UI. I enjoy
            collaborating with designers and backend Developers to deliver
            polished products.
          </p>

          <p className="mt-4 max-w-3xl text-[var(--color-text)] font-[var(--font-inter)]">
            Lately I’ve been working on TypeScript-first codebases, designing
            component systems with Tailwind, and optimizing SSR/ISR routes with
            Next.js. When I’m not coding I like cycling, photography, and
            tinkering with side projects.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 bg-[var(--color-primary)] text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none"
            >
              <FaDownload />
              Download résumé
            </a>

            <a
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 bg-transparent border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-slate-50 dark:hover:bg-slate-800/60 focus:outline-none"
            >
              See projects
            </a>
          </div>

          {/* timeline / quick facts */}
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] p-2">
                <FaGraduationCap className="text-[var(--color-primary)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-heading)]">
                  Education
                </div>
                <div className="text-[var(--color-muted)]">
                  HSc — Ulipur Govt. Degree Collage
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] p-2">
                <FaBriefcase className="text-[var(--color-primary)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-heading)]">
                  Currently
                </div>
                <div className="text-[var(--color-muted)]">
                  Shopify Developer (remote)
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: profile card + skills */}
        <aside ref={rightRef} className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/avator.png"
                    alt="Profile"
                    fill
                    draggable="false"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-lg font-[var(--font-poppins)] text-[var(--color-heading)]">
                    Jillur Rahman
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">
                    <TypingText
                      words={["Front-End", "ReactJS", "Next.js", "Shopify"]}
                    />{" "}
                    Developer
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-[var(--color-text)]">
                I help teams ship maintainable UIs, build design systems, and
                improve frontend performance.
              </div>

              {/* Skills */}
              <div className="mt-6">
                <div className="text-sm font-medium text-[var(--color-heading)]">
                  Core skills
                </div>
                <div className="mt-3 space-y-3">
                  {skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs text-[var(--color-muted)] mb-1">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="w-full bg-[var(--color-code-bg)] rounded-full h-2 overflow-hidden border border-[var(--color-border)]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${s.level}%`,
                            background: "var(--color-primary)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-xs text-[var(--color-muted)]">
                <strong>Open to:</strong> Freelance, Contract, Mentoring
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
