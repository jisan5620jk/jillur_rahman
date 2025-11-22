"use client";

import { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
};

const SAMPLE: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Alex transformed our product UI — shipping a performant, accessible design system under tight deadlines. Highly recommended.",
    name: "Jordan Smith",
    role: "Product Manager",
    company: "Acme Co.",
  },
  {
    id: "t2",
    quote:
      "Fast, communicative, and pragmatic — Alex improved our core web vitals and reduced page load by 42%. A pleasure to work with.",
    name: "Priya Patel",
    role: "Head of Growth",
    company: "Atlas Analytics",
  },
  {
    id: "t3",
    quote:
      "Delivered high-quality components and documentation. Our devs loved the component API and the adoption was immediate.",
    name: "Michael Chen",
    role: "Developering Manager",
    company: "Shoply",
  },
  {
    id: "t4",
    quote:
      "Great collaborator and very fast — helped our team ship a major redesign with near-zero bugs.",
    name: "Lina Ortiz",
    role: "Design Lead",
    company: "Nova Studio",
  },
  {
    id: "t5",
    quote:
      "Alex revamped our Shopify storefront with custom React components — lightning-fast and beautifully responsive across devices.",
    name: "Sophie Nguyen",
    role: "E-commerce Director",
    company: "Urban Threads",
  },
  {
    id: "t6",
    quote:
      "Migrated our legacy site to Next.js with zero downtime. Performance and SEO both skyrocketed — an absolute pro.",
    name: "David Kim",
    role: "Tech Lead",
    company: "BrightLabs",
  },
  {
    id: "t7",
    quote:
      "Alex’s deep understanding of Shopify’s API and React hooks saved us weeks of work. Clean, maintainable code every time.",
    name: "Fatima Al-Rashid",
    role: "Engineering Manager",
    company: "Mode Collective",
  },
  {
    id: "t8",
    quote:
      "From design handoff to production, Alex handled everything with care and speed. Our Next.js app now loads in under a second.",
    name: "Tomás Rivera",
    role: "Founder",
    company: "Craftly Goods",
  },
  {
    id: "t9",
    quote:
      "Superb attention to detail. The custom Shopify theme Alex built doubled our conversion rate within weeks.",
    name: "Emily Zhao",
    role: "Marketing Lead",
    company: "Everleaf Organics",
  },
  {
    id: "t10",
    quote:
      "Alex delivered production-ready code faster than any freelancer we've worked with. Excellent communication and results.",
    name: "Marcus Lee",
    role: "COO",
    company: "Nimbus Tech",
  },
];

export default function Testimonials({
  data = SAMPLE,
}: {
  data?: Testimonial[];
}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Equal height logic
  useEffect(() => {
    const syncCardHeights = () => {
      const cards = document.querySelectorAll<HTMLElement>(".test-card");
      if (!cards.length) return;

      let maxHeight = 0;
      cards.forEach((card) => {
        card.style.height = "auto";
        const height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });
      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    const timeout = setTimeout(syncCardHeights, 300);
    window.addEventListener("resize", syncCardHeights);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", syncCardHeights);
    };
  }, [data]);

  return (
    <section
      className="py-20 px-6 lg:px-12"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="testimonials-heading"
            className="text-2xl font-[var(--font-poppins)] text-[var(--color-heading)]"
          >
            What people say
          </h2>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              aria-label="Previous testimonial"
              className="p-2 rounded-md hover:bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-heading)]"
            >
              <FaChevronLeft />
            </button>

            <button
              ref={nextRef}
              aria-label="Next testimonial"
              className="p-2 rounded-md hover:bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-heading)]"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
            type: "bullets",
            dynamicBullets: true,
          }}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onBeforeInit={(swiper) => {
            if (
              prevRef.current &&
              nextRef.current &&
              swiper.params.navigation
            ) {
              // Type-safe assignment
              (swiper.params.navigation as any).prevEl = prevRef.current;
              (swiper.params.navigation as any).nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {data.map((t) => (
            <SwiperSlide key={t.id}>
              <article className="test-card rounded-2xl p-6 border border-[var(--color-border)] bg-[var(--color-surface)] h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)]">
                        {(() => {
                          const words = t.name.trim().split(" ");
                          return words.length >= 2
                            ? words[0].charAt(0) + words[1].charAt(0)
                            : words[0].charAt(0);
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-sm font-medium text-[var(--color-heading)]">
                          {t.name}
                        </div>
                        <div className="text-xs text-[var(--color-muted)]">
                          {t.role} {t.company ? `• ${t.company}` : ""}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[var(--color-text)] font-[var(--font-inter)] leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
