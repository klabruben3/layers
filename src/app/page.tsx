import { Feed } from "@/components/layout";

export default async function Home() {
  // await new Promise((r) => setTimeout(r, 5000));
  return (
    <div className="relative flex-1 h-full">
      <Feed />
    </div>
  );
}
