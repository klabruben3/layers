import { NextResponse } from "next/server";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostProp {
  author: string;
  status: "Verified" | "Community Submitted";
  releaseDate: string;
  title: string;
  description: string;
  frameWork: "ReactJs" | "NextJs" | "Vanilla" | "Angular" | "Vue";
  tags?: string[];
  preview:{image?: string, video?: string};
  code: string;
  usage: string;
  likes: number;
  comments: number;
}

const posts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  userId: i,
  id: parseFloat((Math.random() * 100).toFixed(2)),
  title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque vel molestiae ratione libero? Dolores ipsa aspernatur explicabo nesciunt voluptate ab provident earum, eaque modi sapiente optio, tempore, nobis eum quaerat!",
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) | 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const slicedPosts = posts.slice(startIndex, endIndex);

  return NextResponse.json(slicedPosts);
}
