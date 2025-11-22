"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import gsap from "gsap";

type Project = {
  id: string;
  title: string;
  short: string;
  role: string;
  tech: string[];
  img: string; // primary thumbnail in /public
  screenshots?: string[]; // optional gallery for modal
  live?: string;
  repo?: string;
};

// Example projects (replace with real data or fetch safely in client)
const projects: Project[] = [
  {
    id: "p1",
    title: "Velocity UI — Design System",
    short: "A component library and token system for fast product prototyping.",
    role: "Lead front-end Developer",
    tech: ["React", "TypeScript", "Tailwind", "Storybook"],
    img: "/terralava.png",
    screenshots: [
      "/projects/velocity-1.jpg",
      "/projects/velocity-2.jpg",
      "/projects/velocity-3.jpg",
    ],
    live: "https://velocity.com",
    repo: "https://github.com/your-username/velocity-ui",
  },
  {
    id: "p2",
    title: "Atlas Analytics",
    short: "Interactive analytics dashboard for marketing & growth teams.",
    role: "Full-stack developer",
    tech: ["Next.js", "Node", "Postgres", "Recharts"],
    img: "/terralava.png",
    screenshots: ["/projects/atlas-1.jpg", "/projects/atlas-2.jpg"],
    live: "https://atlas.com",
    repo: "https://github.com/your-username/atlas-analytics",
  },
  {
    id: "p3",
    title: "Shoply E-commerce",
    short:
      "Headless ecommerce demo with server-side rendering and edge caching.",
    role: "Frontend & infra",
    tech: ["Next.js", "Vercel", "Stripe"],
    img: "/terralava.png",
    screenshots: ["/projects/shoply-1.jpg"],
    live: "https://shoply.example",
    repo: "https://github.com/your-username/shoply",
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // GSAP animations for heading and cards
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".proj-heading", { y: -12, opacity: 0, duration: 0.5 });
      gsap.from(".proj-card", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Reset carousel index whenever modal opens
  useEffect(() => {
    setCarouselIndex(0);
  }, [active]);

  return (
    <section
      ref={rootRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2
            id="projects-heading"
            className="proj-heading text-2xl font-[var(--font-poppins)] text-[var(--color-heading)]"
          >
            Selected Projects
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            Featured work — case studies & live demos.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="proj-card group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  draggable="false"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-[var(--font-poppins)] text-[var(--color-heading)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text)]">
                  {p.short}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-[var(--color-code-bg)] border border-[var(--color-border)] text-[var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
                        aria-label={`Open ${p.title} live demo`}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
                        aria-label={`${p.title} repository`}
                      >
                        <FaGithub />
                      </a>
                    )}
                    <button
                      onClick={() => setActive(p)}
                      className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-transparent border border-[var(--color-border)] text-sm text-[var(--color-text)] hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      aria-haspopup="dialog"
                    >
                      Case study
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} case study`}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative z-10 max-w-4xl w-full rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-lg font-[var(--font-poppins)] text-[var(--color-heading)]">
                  {active.title}
                </h3>
                <div className="text-sm text-[var(--color-muted)]">
                  {active.role}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {active.live && (
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--color-primary)] inline-flex items-center gap-2"
                  >
                    Live <FaExternalLinkAlt />
                  </a>
                )}
                {active.repo && (
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm inline-flex items-center gap-2 text-[var(--color-text)]"
                  >
                    Repo <FaGithub />
                  </a>
                )}
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close case study"
                  className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 grid gap-6 lg:grid-cols-2">
              {/* Left: gallery */}
              <div>
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-[var(--color-code-bg)] border border-[var(--color-border)]">
                  <Image
                    src={active.screenshots?.[carouselIndex] ?? active.img}
                    alt={`${active.title} screenshot ${carouselIndex + 1}`}
                    fill
                    draggable="false"
                    className="object-cover"
                  />
                </div>

                {/* Carousel controls */}
                {active.screenshots && active.screenshots.length > 1 && (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCarouselIndex((i) =>
                          i === 0 ? active.screenshots!.length - 1 : i - 1
                        )
                      }
                      className="px-3 py-1 rounded border border-[var(--color-border)] text-sm"
                    >
                      Prev
                    </button>
                    <div className="text-sm text-[var(--color-muted)]">
                      {carouselIndex + 1} / {active.screenshots.length}
                    </div>
                    <button
                      onClick={() =>
                        setCarouselIndex((i) =>
                          i === active.screenshots!.length - 1 ? 0 : i + 1
                        )
                      }
                      className="px-3 py-1 rounded border border-[var(--color-border)] text-sm"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>

              {/* Right: details */}
              <div>
                <h4 className="text-sm font-medium text-[var(--color-heading)]">
                  Overview
                </h4>
                <p className="mt-2 text-sm text-[var(--color-text)]">
                  {active.short}
                </p>

                <h4 className="mt-4 text-sm font-medium text-[var(--color-heading)]">
                  My role
                </h4>
                <p className="mt-2 text-sm text-[var(--color-text)]">
                  {active.role}
                </p>

                <h4 className="mt-4 text-sm font-medium text-[var(--color-heading)]">
                  Tech
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-[var(--color-code-bg)] border border-[var(--color-border)] text-[var(--color-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  {active.live && (
                    <a
                      href={active.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--color-primary)] text-white font-medium"
                    >
                      View live <FaExternalLinkAlt />
                    </a>
                  )}
                  {active.repo && (
                    <a
                      href={active.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-border)] text-sm"
                    >
                      View repo <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
