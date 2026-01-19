export default async function Feed() {
  const users = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    user: `user ${i + 1}`,
  }));
  return (
    <>
      {users.map((post: any) => (
        <div
          key={`user:${post.userId},postID=${post.id}`}
          className="rounded-border bg-foreground h-50 w-full border-2 border-[var(--gray)] mb-5 snap-start"
        >
          <span>Title:</span>
          <br />
          <p>{post.title}</p>
          <span>Messagge:</span>
          <br />
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}
