"use client";

import { useEffect } from "react";

export function MouseFlowBackground() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      return;
    }

    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--cursor-x",
          `${Math.round((event.clientX / window.innerWidth) * 100)}%`
        );
        document.documentElement.style.setProperty(
          "--cursor-y",
          `${Math.round((event.clientY / window.innerHeight) * 100)}%`
        );
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <div aria-hidden="true" className="mouse-flow-background" />;
}
