import Link from "next/link"
import React from "react"
import { urlFor } from "../sanity"
import { Post } from "../typings"

interface Props {
  data: Post
}

function PostCard({ data }: Props) {
  return (
    <Link key={data._id} href={`/post/${data.slug.current}`}>
      <div className="border rounded-lg group cursor-pointer overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 
          transition-transform duration-100 ease-in-out"
          src={urlFor(data.mainImage).url()!}
          alt="article main image"
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{data.title}</p>
            <p className="text-xs">
              {data.description} by {data.author.name}
            </p>
          </div>
          <img
            className="h-11 rounded-full"
            src={urlFor(data.author.image).url()!}
            alt="author profile picture"
          />
        </div>
      </div>
    </Link>
  )
}

export default PostCard
