import {ReactElement} from "react";
import * as fs from "node:fs";
import path from "node:path";
import parseMDX from "@/app/blog/_lib/mdx";
import {PostHeading} from "@/app/blog/_lib/headings";
import {z} from "zod";

export type Post = {
    slug: string;
    route: string;
    source: string;
    metadata: PostMetadata;
    content: ReactElement;
    headings: PostHeading[];
}

export const postMetadataSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    cover: z.string(),
    date: z.coerce.date(),
});

export type PostMetadata = z.infer<typeof postMetadataSchema>;

const postsDirectory = "posts";
export const posts = await getPosts();

async function getPosts(): Promise<Post[]> {

    if (!fs.statSync(postsDirectory).isDirectory()) {
        return [];
    }

    const files = fs.readdirSync(postsDirectory);

    return Promise.all(files.map(async (file) => {

        const source = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
        const {content, metadata, headings} = await parseMDX(source);

        const slug = file.replace('.mdx', '');

        return {
            slug,
            route: `/blog/${slug}`,
            source,
            metadata,
            content,
            headings
        };

    }));

}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    return posts.find(post => post.slug === slug) || null;
}