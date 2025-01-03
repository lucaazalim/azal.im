import Link from "next/link";
import Image from "next/image";
import {Post} from "@/app/blog/_lib/posts";
import * as motion from '@/app/_utils/motion';
import {format} from "date-fns";

type Props = {
    post: Post;
    index: number;
}

export default function PostCard({post, index}: Props) {

    return <Link href={post.route}>
        <motion.article
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="border-neutral-800 border h-full flex flex-col group rounded-2xl overflow-hidden">
            <div className="relative w-full shrink-0 h-[200px]">
                <Image
                    src={post.metadata.cover}
                    alt={post.metadata.title}
                    fill={true}
                    sizes="30vw"
                    className="object-cover rounded-t-2xl"
                />
            </div>
            <div className="flex-grow flex flex-col justify-between gap-3 p-5">
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{post.metadata.title}</h3>
                    <p className="text-neutral-500 line-clamp-3">{post.metadata.description}</p>
                </div>
                <div>
                    <p className="text-sm">{format(post.metadata.date, "LLLL d, yyyy")}</p>
                </div>
            </div>
        </motion.article>
    </Link>;

}