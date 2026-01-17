"use client";

import { useEffect } from "react";

export default function usePointerReveal<T extends HTMLElement>({
  enabled,
  open,
  ref,
  triggerAxis,
  onReveal,
  onClose,
  triggerOffset,
}: {
  enabled: boolean;
  open: boolean;
  triggerOffset: number;
  ref: { reveal: React.RefObject<T | null>; close: React.RefObject<T | null> };
  triggerAxis: "horizontal" | "vertical";
  onReveal: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!enabled) return;
    const el = !open ? ref.reveal.current : ref.close.current;
    if (!el) return;
    el.style.touchAction = "none";

    let triggered = false;
    const initialPos = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      if (triggered) return;
      const dy = initialPos.y - e.clientY;
      const dx = initialPos.x - e.clientX;

      const xDirection = Math.sign(dx) === -1 ? "right" : "left";
      const yDirection = Math.sign(dy) === -1 ? "down" : "up";

      if (triggerAxis == "vertical" && Math.hypot(dy, dx) > triggerOffset) {
        if (!open && yDirection == "down") onReveal();
        else if (open && yDirection == "up") onClose();
        triggered = true;
      } else if (
        triggerAxis == "horizontal" &&
        Math.hypot(dy, dx) > triggerOffset
      ) {
        if (!open && xDirection == "right") onReveal();
        else if (open && xDirection == "left") onClose();
        triggered = true;
      }
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

      initialPos.x = e.clientX;
      initialPos.y = e.clientY;
    };

    const onCancel = (e: PointerEvent) => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointercancel", onCancel);

    return () => {
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("pointerdown", onDown);
      el.style.touchAction = "";
    };
  }, [enabled, open, ref, triggerAxis, triggerOffset, onReveal, onClose]);
}
