import {posts} from "@/app/blog/_lib/posts";
import PostCard from "@/app/blog/_components/PostCard";
import * as motion from '@/app/_utils/motion';

export default function Page() {

    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
        className="max-w-screen-lg mx-auto p-5 space-y-10">
        <header>
            <h1 className="font-serif text-4xl font-bold">Luca Azalim's Blog</h1>
            <h2 className="font-serif text-xl">I write about programming, technology, and life.</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post, index) =>
                <PostCard key={index} post={post} index={index}/>
            )}
        </div>
    </motion.div>

}