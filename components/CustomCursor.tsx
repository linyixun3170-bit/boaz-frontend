"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Check for touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      dot.style.display = "none";
      document.querySelectorAll("*").forEach((el) => {
        (el as HTMLElement).style.cursor = "auto";
      });
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onEnterInteractive = () => {
      gsap.to(cursor, {
        width: 48,
        height: 48,
        borderColor: "rgba(26, 26, 26, 0.3)",
        backgroundColor: "rgba(26, 26, 26, 0.05)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        borderColor: "rgba(26, 26, 26, 0.8)",
        backgroundColor: "transparent",
        mixBlendMode: "normal",
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    // Animation loop
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      gsap.set(cursor, {
        x: pos.current.x,
        y: pos.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(dot, {
        x: target.current.x,
        y: target.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);

    // Attach listeners
    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover], img'
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover], img'
      );
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-charcoal/80 will-change-transform hidden md:block"
        style={{ width: 12, height: 12 }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1 h-1 rounded-full bg-charcoal will-change-transform hidden md:block"
      />
    </>
  );
}
