import { ROUTES } from "@/app/_utils/constants";
import * as motion from "@/app/_utils/motion";
import InThisPost from "@/app/blog/_components/InThisPost";
import { getPostBySlug, getPosts } from "@/app/blog/_lib/posts";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return (await getPosts()).map((post) => {
    return {
      path: post.slug,
    };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = "https://azal.im/blog/" + post.slug;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [
        {
          url: ROUTES.OG(post.metadata.title, post.metadata.description),
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
      url: url,
      siteName: "Blog",
      locale: "pt_BR",
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="mx-auto px-5 py-10 max-w-[950px]">
      <article className="space-y-10">
        <Link
          href={ROUTES.BLOG}
          className="flex items-center gap-1 transition-colors text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Blog</span>
        </Link>
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-foreground">
            {post.metadata.title}
          </h1>
          <p className="text-foreground-muted">{post.metadata.description}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative w-full h-[300px] md:h-[500px]"
        >
          <Image
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="100vw"
            className="rounded-2xl object-cover"
          />
          <Image
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="100vw"
            className="-z-40 object-cover opacity-40 blur-2xl"
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,0.2fr] gap-5">
          <div className="shrink prose prose-primary dark:prose-invert">
            {post.content}
          </div>
          <div className="sticky top-10 hidden h-fit lg:block">
            <InThisPost headings={post.headings} />
          </div>
        </div>
      </article>
    </main>
  );
}
