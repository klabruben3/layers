export default async function Home() {
  await new Promise((r) => setTimeout(r, 5000));
  return (
    <div className="relative flex-1 h-full overflow-y-auto layers-scroll p-5">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className={`rounded-border bg-foreground h-50 w-full border-2 border-[var(--gray)] mb-5 snap-start ${
            i % 2 === 0 ? "scroll-m-5" : null
          }`}
        />
      ))}
    </div>
  );
}
