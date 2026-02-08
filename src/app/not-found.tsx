import { Roboto_Slab, Inter } from "next/font/google";

const RobotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});
const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <main
      className={`${InterFont.className} h-screen w-full xy-center flex-col gap-4 text-center`}
    >
      <span className="text-6xl font-bold text-white/25">404</span>
      <h1 className="text-2xl font-bold">You stepped off the rails.</h1>

      <p className="max-w-md">
        <span className="text-sm text-white/60">
          This layer isn’t indexed in{" "}
        </span>
        <a
          href="/"
          title="Go back to safety"
          className={`${RobotoSlab.className} group text-xl`}
        >
          <span className="text-sm text-primary group-hover:text-white transition-[color] duration-200">
            i
          </span>
          <span className="text-white group-hover:text-primary transition-[color] duration-200">
            Layers
          </span>
        </a>
        <span className="text-sm text-white/60 ">
          . Either the path doesn’t exist, or you weren’t meant to land here.
        </span>
      </p>
    </main>
  );
}
