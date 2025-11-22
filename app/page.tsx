"use client";

import { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Sidebar from "./components/Sidebar";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa6";

// TypeScript type for ScrollSmoother
import type { ScrollSmoother as ScrollSmootherType } from "gsap/ScrollSmoother";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const smootherRef = useRef<ScrollSmootherType | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let smoother: ScrollSmootherType | null = null;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section as HTMLElement, {
          // <-- cast here
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section as HTMLElement, // also cast trigger
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el as HTMLElement, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    });

    // Dynamically import ScrollSmoother for smoother scrolling
    (async () => {
      try {
        const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
        gsap.registerPlugin(ScrollSmoother);

        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true, // enables data-speed / data-lag attributes
          normalizeScroll: true,
        });

        smootherRef.current = smoother;
      } catch (err) {
        // Fallback to native smooth scrolling if ScrollSmoother fails
        document.documentElement.style.scrollBehavior = "smooth";
        console.warn(
          "ScrollSmoother not available — using CSS smooth scroll fallback."
        );
      }
    })();

    return () => {
      // Cleanup
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="h-full bg-[var(--color-bg)] font-sans relative">
      <Sidebar />

      {/* ScrollSmoother wrapper/content */}
      <div id="smooth-wrapper" style={{ minHeight: "100vh", overflow: "auto" }}>
        <main
          id="smooth-content"
          className="max-w-[calc(100%-320px)] ml-auto min-h-screen w-full"
        >
          <Hero />
          <About />
          <Projects />
          <Testimonials />
          <Blog />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>

      {/* Dark/Light Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-50 backdrop-blur-xs p-2.5 py-2 rounded-l-full transition-all duration-500 border-r-0 font-[var(--font-inter)] border border-black/30 dark:border-white/30 text-sm font-medium text-[var(--color-heading)] cursor-pointer -mr-[80px] dark:-mr-[83px] hover:mr-0"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* WhatsApp Contact */}
      <a
        href="https://wa.me/8801773127733?text=Hello%20Jillur!%20I%20just%20viewed%20your%20portfolio%20and%20was%20really%20impressed%20by%20your%20creative%20designs.%20I%20would%20love%20to%20connect%20with%20you%20and%20talk%20about%20a%20potential%20collaboration."
        target="_blank"
        rel="noopener noreferrer"
        title="Click to send a WhatsApp message"
        className="fixed right-8 bottom-8 z-50 backdrop-blur-xs w-[50px] h-[50px] text-3xl rounded-full flex justify-center items-center border text-[#25d366] transition-all duration-500 hover:text-[var(--color-primary)] border-black/30 dark:border-white/30"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
