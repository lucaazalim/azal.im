import * as fs from "node:fs";
import path from "node:path";
import { ReactElement } from "react";
import { z } from "zod";
import { PostHeading } from "./headings";
import parseMDX from "./mdx";

export type Post = {
  slug: string;
  route: string;
  source: string;
  metadata: PostMetadata;
  content: ReactElement;
  headings: PostHeading[];
};

export const postMetadataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cover: z.string(),
  date: z.coerce.date(),
});

export type PostMetadata = z.infer<typeof postMetadataSchema>;

const postsDirectory = path.join(process.cwd(), "data/posts");

export async function getPost(file: string): Promise<Post | null> {
  const joinedPath = path.join(postsDirectory, file);

  if (!fs.existsSync(joinedPath)) {
    return null;
  }

  const source = fs.readFileSync(joinedPath, "utf8");
  const { content, metadata, headings } = await parseMDX(source);

  const slug = file.replace(".mdx", "");

  return {
    slug,
    route: `/blog/${slug}`,
    source,
    metadata,
    content,
    headings,
  };
}

export async function getPosts(): Promise<Post[]> {
  if (!fs.statSync(postsDirectory).isDirectory()) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);

  return (await Promise.all(files.map(getPost)))
    .filter((post) => post !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return getPost(slug + ".mdx");
}
