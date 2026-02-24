import { IlayersButton } from "@/components/ui";

export default function NotFound() {
  return (
    <main
      className="h-screen w-full xy-center flex-col gap-4 text-center"
    >
      <span className="text-6xl font-bold text-white/25">404</span>
      <h1 className="text-2xl font-bold">You stepped off the rails.</h1>

      <p className="max-w-md">
        <span className="text-sm text-white/60">
          This layer isn’t indexed in{" "}
        </span>
        <IlayersButton />
        <span className="text-sm text-white/60 ">
          . Either the path doesn’t exist, or you weren’t meant to land here.
        </span>
      </p>
    </main>
  );
}
