"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { slideshowPhotos } from "@/data/slideshow-photos";

const SLIDES = slideshowPhotos.map((slide) => slide.image).slice(0, 15);
const SLIDE_CAPTIONS = slideshowPhotos.map((slide) => slide.caption).slice(0, 15);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
    if (!heroRef.current || !bgRef.current) return;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".hero-copy",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".hero-action",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.2 }
      );
      if (!prefersReduced) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1 },
          { scale: 1.02, duration: 45, ease: "sine.inOut", overwrite: "auto" }
        );
      }
    }, heroRef);

    let frame = 0;

    const handleScroll = () => {
      if (!heroRef.current || !bgRef.current) return;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = heroRef.current?.getBoundingClientRect();
        const offset = rect ? Math.min(Math.max(-rect.top / 12, -18), 18) : 0;
        gsap.to(bgRef.current, {
          y: offset,
          duration: 0.5,
          ease: "power3.out",
        });
        frame = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Slideshow: crossfade + slow Ken Burns zoom driven by a single looping GSAP timeline.
  // A single timeline (vs. setInterval + gsap.set on every tick) avoids timer drift and the
  // previous bug where each transition re-ran the effect and snapped/interrupted the in-flight
  // fade + zoom tweens it had just started.
  useEffect(() => {
    const slideCount = SLIDES.length;
    const slideEls = slideRefs.current;
    const wrapEls = imgWrappers.current;
    if (slideCount === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Baseline: first slide visible and unzoomed, the rest hidden.
    slideEls.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
    wrapEls.forEach((wrap) => wrap && gsap.set(wrap, { scale: 1 }));

    if (prefersReduced || slideCount < 2) return;

    const HOLD = 10; // seconds between the start of one slide and the next
    const FADE = 1.4; // seconds crossfade duration

    const tl = gsap.timeline({ repeat: -1 });

    slideEls.forEach((el, i) => {
      const wrap = wrapEls[i];
      const start = i * HOLD;
      if (wrap) {
        tl.set(wrap, { scale: 1 }, start);
        tl.to(wrap, { scale: 1.06, duration: HOLD + FADE, ease: "sine.out" }, start);
      }
      if (el) {
        tl.to(el, { autoAlpha: 1, duration: FADE, ease: "power1.inOut" }, start);
        tl.to(el, { autoAlpha: 0, duration: FADE, ease: "power1.inOut" }, start + HOLD);
      }
      tl.call(() => setActive(i), undefined, start);
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  const handlePause = () => {
    timelineRef.current?.pause();
  };
  const handleResume = () => {
    timelineRef.current?.play();
  };

  return (
    <section suppressHydrationWarning className="relative isolate overflow-hidden bg-[#0A0C10] pt-6">
      <div className="absolute inset-0 hero-bg" ref={bgRef} />
      {/* Slideshow slides (crossfade + subtle zoom) */}
      <div
        className="absolute inset-0 z-0"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        {SLIDES.map((src, i) => (
          <div
            key={src}
            ref={(el) => { slideRefs.current[i] = el as HTMLDivElement | null; }}
            className="absolute inset-0 h-full w-full overflow-hidden"
            aria-hidden={i !== active}
          >
            <div
              ref={(el) => { imgWrappers.current[i] = el as HTMLDivElement | null; }}
              className="absolute inset-0 transform-gpu"
              style={{ willChange: 'transform, opacity' }}
            >
              <Image
                src={src}
                alt={SLIDE_CAPTIONS[i] ?? `Hero slide ${i + 1}`}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                unoptimized
              />
            </div>
          </div>
        ))}
        <span className="sr-only" aria-live="polite">{SLIDE_CAPTIONS[active] ?? ''}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/70" />

      <div
        className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-10 lg:px-16"
        ref={heroRef}
      >
        <div className="max-w-3xl rounded-[32px] bg-black/10 p-8 backdrop-blur-sm sm:p-10">
          <p className="mb-6 inline-flex rounded-full border border-white/10 px-4 py-1.5 text-sm uppercase tracking-[0.35em] text-white/70">
            Fine Art Landscape &amp; Nightscape
          </p>
          <h1 className="hero-title text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Tamás Csizmadia
            <span className="block text-[#D4AF37] mt-2 text-2xl font-medium tracking-wide sm:text-3xl">
              Fineart Photos and Mountain Spirit
            </span>
          </h1>
          <p className="hero-copy mt-8 max-w-2xl text-lg leading-9 text-white/75 sm:text-xl">
            A moody, modern portfolio for mountain light, alpine exploration, and extraordinary prints designed for collectors, exhibitions, and lovers of high-altitude atmosphere.
          </p>
          <div className="hero-action mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Explore the Gallery
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-[#D4AF37]"
            >
              About the Artist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
