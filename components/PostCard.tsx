import Link from "next/link"
import React from "react"
import { urlFor } from "../sanity"
import { Post } from "../typings"

interface Props {
  data: Post
}

function PostCard({ data }: Props) {

  const toDate = (date: string) => {
    var newDate = new Date(date).toString().split(" ")
    return newDate[1] + " " + newDate[2] + " "
  }

  return (
    <Link key={data._id} href={`/post/${data.slug.current}`}>
      <div className="grid grid-cols-3 mb-6 cursor-pointer w-full">
        <div className="col-span-2">
          <div className="flex mb-3">
            <img
              className="h-5 w-5 object-cover rounded-full mr-2"
              src={urlFor(data.author.image).url()!}
              alt="author profile picture"
            />
            <p className="text-sm font-medium">{data.author.name}</p>
          </div>
          <p className="font-bold mb-2">{data.title}</p>
          <p>{data.description}</p>
          <div>
            <span className="font-thin text-sm text-[#757575]">
              {toDate(data._createdAt)} • {data.timeToRead} read
            </span>
          </div>
        </div>
        <img
          className="h-32 w-48 object-cover"
          src={urlFor(data.mainImage).url()!}
          alt=""
        />
      </div>
    </Link>
  )
}

export default PostCard
