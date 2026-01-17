"use client";

import { useEffect } from "react";

export default function usePointerReveal<T extends HTMLElement>({
  enabled,
  open,
  ref,
  onReveal,
  onClose,
}: {
  enabled: boolean;
  open: boolean;
  ref: { reveal: React.RefObject<T | null>; close: React.RefObject<T | null> };
  onReveal: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!enabled) return;
    const el = !open ? ref.reveal.current : ref.close.current;
    if (!el) return;

    let triggered = false;

    const onMove = () => {
      if (triggered) return;
      triggered = true;
      open ? onClose() : onReveal();
    };

    const onUp = (e: PointerEvent) => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.releasePointerCapture(e.pointerId);
    };

    const onDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    };

    el.addEventListener("pointerdown", onDown);

    return () => {
      el.removeEventListener("pointerdown", onDown);
    };
  }, [enabled, open, ref, onReveal, onClose]);
}
