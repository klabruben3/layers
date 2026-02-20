"use client";
import { Layers2 } from "lucide-react";
import { SweepText } from "../effects";
import { useState } from "react";
import { redirect } from "next/navigation";

function LogoImage() {
  return (
    <span className="z-10 group-hover:text-primary transition-[color] duration-200 rounded-border bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]">
      <Layers2 width={24} className="m-2" />
    </span>
  );
}

function Layers({ isTriggered }: { isTriggered: boolean }) {
  return (
    <SweepText
      beforeSweepText={<span className="text-sm text-primary">i</span>}
      textToSweep="Layers"
      isTriggered={isTriggered}
    />
  );
}

export default function Logo() {
  const [triggerState, setTriggerState] = useState<"active" | "inactive">(
    "inactive",
  );

  return (
    <button
      onMouseEnter={() => setTriggerState("active")}
      onMouseLeave={() => setTriggerState("inactive")}
      onClick={() =>redirect("/")}
      className="group flex items-center gap-[10] cursor-pointer"
    >
      <LogoImage />
      <Layers isTriggered={triggerState == "active"} />
    </button>
  );
}

export { Layers, LogoImage };
