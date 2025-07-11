import BackButton from "@/app/(home)/_components/BackButton";
import PageWrapper from "@/app/_components/header/PageWrapper";
import LoadingImage from "@/app/_components/LoadingImage";
import * as motion from "@/app/_components/Motion";
import InThisPost from "@/app/blog/_components/InThisPost";
import { getPostBySlug, getPosts } from "@/lib/blog/posts";
import { BASE_URL, routes } from "@/lib/constants";
import { Metadata } from "next";
import NotFound from "next/dist/client/components/not-found-error";
import ProgressBar from "../_components/ProgressBar";
import Script from "next/script";

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

  const url = BASE_URL + routes.blog(post.slug);

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
          url: routes.api.og(post.metadata.title, post.metadata.description),
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

  const url = BASE_URL + routes.blog(post.slug);
  const publishedDate = post.metadata.date || new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metadata.title,
    "description": post.metadata.description,
    "image": post.metadata.cover,
    "author": {
      "@type": "Person",
      "name": "Luca Azalim",
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Person",
      "name": "Luca Azalim",
      "url": BASE_URL
    },
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url
  };

  return (
    <PageWrapper className="mx-auto max-w-5xl pt-5">
      <Script
        id="blogpost-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgressBar />
      <article className="space-y-10">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <BackButton label="Posts" href={routes.blog()} />
          <h1 className="text-foreground font-serif text-4xl font-bold">
            {post.metadata.title}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {post.metadata.description}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative h-[300px] w-full md:h-[500px]"
        >
          <LoadingImage
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="100vw"
            className="object-cover"
          />
          <LoadingImage
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="100vw"
            className="-z-40 object-cover opacity-40 blur-2xl"
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_0.2fr]">
          <div className="prose prose-primary dark:prose-invert shrink">
            {post.content}
          </div>
          <div className="sticky top-[calc(var(--navbar-height)+3rem)] hidden h-fit lg:block">
            <InThisPost headings={post.headings} />
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
