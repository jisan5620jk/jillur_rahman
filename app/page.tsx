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
// ScrollSmoother is dynamically imported below (so the app can run even if you don't have it)

export default function Home() {
  const [theme, setTheme] = useState("light");
  const smootherRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let smoother = null;
    let ctx = gsap.context(() => {
      // common ScrollTrigger-based section fade-in
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // parallax for elements that have data-parallax (e.g. backgrounds or images)
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    });

    // Try to enable ScrollSmoother (dynamic import)
    (async () => {
      try {
        const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
        gsap.registerPlugin(ScrollSmoother);
        // create smoother: wrapper and content IDs must match markup below
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true, // enables data-speed / data-lag attributes if used
          normalizeScroll: true,
        });
        smootherRef.current = smoother;
      } catch (err) {
        // If ScrollSmoother isn't available, fall back to native smooth scrolling
        // This keeps smooth behavior and allows ScrollTrigger animations to work.
        document.documentElement.style.scrollBehavior = "smooth";
        console.warn(
          "ScrollSmoother not available — using CSS smooth scroll fallback."
        );
      }
    })();

    return () => {
      // cleanup
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="h-full bg-[var(--color-bg)] font-sans relative">
      <Sidebar />

      {/* ScrollSmoother wrapper/content for smoother scrolling if available.
          If ScrollSmoother isn't available we still render the same DOM and use CSS fallback. */}
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

      {/* Dark Light Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-50 backdrop-blur-xs p-2.5 py-2 rounded-l-full transition-all duration-500 border-r-0 font-[var(--font-inter)] border border-black/30 dark:border-white/30 text-sm font-medium text-[var(--color-heading)] cursor-pointer -mr-[80px] dark:-mr-[83px] hover:mr-0"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* What's App Contact */}
      <a
        href="https://wa.me/8801773127733?text=Hello%20Jillur!%20I%20just%20viewed%20your%20portfolio%20and%20was%20really%20impressed%20by%20your%20creative%20designs.%20I%20would%20love%20to%20connect%20with%20you%20and%20talk%20about%20a%20potential%20collaboration."
        target="_blank"
        rel="noopener noreferrer"
        title="Click to send a WhatsApp message"
        className="fixed right-8 bottom-8 z-50 backdrop-blur-xs size-[50px] text-3xl rounded-full flex justify-center items-center border text-[#25d366] transition-all duration-500 hover:text-[var(--color-primary)] border-black/30 dark:border-white/30"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
