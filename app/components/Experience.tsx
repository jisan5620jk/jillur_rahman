"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
};

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    period: "2023 – Present",
    description:
      "Leading frontend development with React, Next.js, and TypeScript. Focused on building scalable, accessible design systems and improving performance metrics.",
    type: "work",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Creative Labs",
    period: "2020 – 2023",
    description:
      "Implemented responsive interfaces and animation systems using GSAP and Framer Motion. Collaborated closely with UI/UX teams and backend Developers.",
    type: "work",
  },
  {
    id: 3,
    title: "Bachelor of Computer Science",
    company: "National Institute of Technology",
    period: "2016 – 2020",
    description:
      "Graduated with honors. Specialized in software development, data structures, and web technologies.",
    type: "education",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", { y: -20, opacity: 0, duration: 0.6 });
      gsap.from(".exp-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-6 lg:px-12 bg-[var(--color-bg-alt)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="exp-heading text-3xl md:text-4xl font-[var(--font-poppins)] font-bold text-[var(--color-heading)]">
            Experience & Education
          </h2>
          <p className="text-[var(--color-muted)] mt-3 max-w-2xl mx-auto">
            My professional journey — roles, contributions, and the foundations
            that shaped my skills.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-[var(--color-border)] pl-6 md:pl-10 space-y-10">
          {EXPERIENCES.map((item) => (
            <div key={item.id} className="exp-item relative group">
              {/* timeline dot */}
              <div
                className={`absolute -left-[10px] md:-left-[13px] top-2 w-5 h-5 rounded-full flex items-center justify-center ${
                  item.type === "work"
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)]"
                }`}
              >
                {item.type === "work" ? (
                  <FaBriefcase className="text-white text-[10px]" />
                ) : (
                  <FaGraduationCap className="text-[var(--color-primary)] text-[10px]" />
                )}
              </div>

              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm transition-all duration-300 group-hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[var(--color-heading)]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-[var(--color-muted)]">
                    {item.period}
                  </span>
                </div>
                <div className="text-sm text-[var(--color-primary)] font-medium mb-2">
                  {item.company}
                </div>
                <p className="text-[var(--color-text)] leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
