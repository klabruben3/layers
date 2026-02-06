"use client";

import { useEffect } from "react";

export default function usePointerReveal<T extends HTMLElement>({
  enabled,
  open,
  ref,
  triggerAxis,
  forceRerender,
  onReveal,
  onClose,
  triggerOffset,
}: {
  enabled: boolean;
  open: boolean;
  forceRerender?: string | number;
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

    // eslint-disable-next-line react-hooks/immutability
    el.style.touchAction = "none";

    let triggered = false;
    const initialPos = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      if (triggered) return;
      const dy = initialPos.y - e.clientY;
      const dx = initialPos.x - e.clientX;

      if (Math.hypot(dy, dx) < triggerOffset) return;

      const xDirection = Math.sign(dx) === -1 ? "right" : "left";
      const yDirection = Math.sign(dy) === -1 ? "down" : "up";
      const absAngle = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);
      const isVertical = absAngle > 70 && absAngle < 110;
      const isHorizontal = absAngle < 20 || absAngle > 160;

      if (triggerAxis == "vertical" && isVertical) {
        if (!open && yDirection == "down") {
          triggered = true;
          onReveal();
        } else if (open && yDirection == "up") {
          triggered = true;
          onClose();
        }
      }
      if (triggerAxis == "horizontal" && isHorizontal) {
        if (!open && xDirection == "right") {
          triggered = true;
          onReveal();
        } else if (open && xDirection == "left") {
          triggered = true;
          onClose();
        }
      }
    };

    const onUp = (e: PointerEvent) => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.releasePointerCapture(e.pointerId);
    };

    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("button")) return;

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
  }, [
    enabled,
    open,
    ref,
    triggerAxis,
    triggerOffset,
    onReveal,
    onClose,
    forceRerender,
  ]);
}
