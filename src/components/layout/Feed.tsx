async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Feed() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post: any) => (
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
