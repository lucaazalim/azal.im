import {getPosts} from "@/app/blog/_lib/posts";
import PostCard from "@/app/blog/_components/PostCard";
import * as motion from '@/app/_utils/motion';
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {ROUTES} from "@/app/_utils/constants";

export default async function Page() {

    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
        className="mx-auto px-5 py-10 max-w-[950px] space-y-10">
        <header className="space-y-10">
            <Link
                href={ROUTES.HOME}
                className="flex items-center gap-1 transition-colors text-foreground-muted hover:text-foreground">
                <ArrowLeft className="h-5 w-5"/>
                <span>Home</span>
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold">Luca Azalim's Blog</h1>
                <h2 className="font-serif text-xl">I write about programming, technology, and life.</h2>
            </div>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {(await getPosts()).map((post, index) =>
                <PostCard key={index} post={post} index={index}/>
            )}
        </div>
    </motion.div>

}