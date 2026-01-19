import { NextResponse } from "next/server";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getAllPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function GET(request: Request) {
  const posts = await getAllPosts();

  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const slicedPosts = posts.slice(startIndex, endIndex);

  return NextResponse.json(slicedPosts);
}
