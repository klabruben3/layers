function RenderPosts() {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="rounded-border bg-foreground h-50 w-full border-2 border-[var(--gray)] mb-5 p-3"
        />
      ))}
    </>
  );
}

export default function Feed() {
  return (
    <div
      className="overflow-y-scroll h-full layers-scroll p-5"
    >
      <RenderPosts />
    </div>
  );
}
