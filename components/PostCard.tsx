import Link from "next/link"
import React from "react"
import { toDate } from "../lib/utils"
import { urlFor } from "../sanity"
import { Post } from "../typings"

interface Props {
  post: Post
}

function PostCard({ post }: Props) {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div
        key={post._id}
        className="grid grid-cols-3 mb-6 cursor-pointer w-full"
      >
        <div className="col-span-2">
          <div className="flex mb-3">
            <img
              className="h-5 w-5 object-cover rounded-full mr-2"
              src={urlFor(post.author.image).url()!}
              alt="author profile picture"
            />
            <p className="text-sm font-medium">{post.author.name}</p>
          </div>
          <p className="font-bold mb-2">{post.title}</p>
          <p>{post.description}</p>
          <div>
            <span className="font-thin text-sm text-[#757575]">
              {toDate(post._createdAt)} • {post.timeToRead} read
            </span>
          </div>
        </div>
        <img
          className="h-32 w-48 object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
      </div>
    </Link>
  )
}

export default PostCard
