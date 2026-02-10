"use client";

import { useRef, useState } from "react";
import { Layers } from "./Logo";

export default function IlayersButton() {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const [active, setActive] = useState(false);

  return (
    <a
      ref={linkRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      href="/"
      title="Go back to safety"
    >
      <Layers isTriggered={active} />
    </a>
  );
}
