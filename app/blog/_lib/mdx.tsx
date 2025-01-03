import Link from 'next/link'
import Image from 'next/image'
import {compileMDX} from 'next-mdx-remote/rsc'
import React, {ReactElement, ReactNode} from 'react'
import rehypeUnwrapImages from "rehype-unwrap-images";
import {PostMetadata, postMetadataSchema} from "@/app/blog/_lib/posts";
import {createHeading, extractHeadings, PostHeading} from "@/app/blog/_lib/headings";
import rehypePrettyCode from "rehype-pretty-code";

type TableData = {
    headers: string[]
    rows: string[][]
}

function Table(data: TableData) {

    const headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))

    const rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
            <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

type CustomLinkProps = {
    href: string;
    children: ReactNode;
    [key: string]: any;
}

function CustomLink({href, ...props}: CustomLinkProps) {

    if (href.startsWith('/') || href.startsWith('#')) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        )
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;

}

type CustomImageProps = {
    src: string;
    alt: string;
    [key: string]: any;
}

function CustomImage({alt, ...props}: CustomImageProps) {

    const className = "rounded-lg";
    let image: ReactElement;

    if (props.src.startsWith('http')) {
        // eslint-disable-next-line @next/next/no-img-element
        image = <img alt={alt} className={className} {...props} />
    } else {
        image = <Image width={650} height={650} alt={alt} className={className} {...props} />
    }

    return <figure>
        {image}
        {alt && <figcaption className="text-center text-sm text-muted-foreground">{alt}</figcaption>}
    </figure>

}

const components = {
    h1: createHeading(2),
    h2: createHeading(3),
    h3: createHeading(4),
    h4: createHeading(5),
    h5: createHeading(6),
    h6: createHeading(7),
    img: CustomImage,
    a: CustomLink,
    table: Table,
}

export default async function parseMDX(source: string): Promise<{
    content: ReactElement,
    metadata: PostMetadata,
    headings: PostHeading[]
}> {

    const {content, frontmatter} = await compileMDX<PostMetadata>({
        source,
        options: {
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [rehypeUnwrapImages, rehypePrettyCode],
            },
            parseFrontmatter: true,
        },
        components
    });

    const headings = extractHeadings(source);

    return {
        content,
        metadata: postMetadataSchema.parse(frontmatter),
        headings
    };

}