import { LogoImage } from "@/components/ui";

export default function Loading() {
  return (
    <main className="z-10 fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-background/30">
      <LogoImage />
    </main>
  );
}
