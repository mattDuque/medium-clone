import React from "react"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { urlFor } from "../sanity"
import { Post } from "../typings"

interface Props {
  data: [Post]
}

function Trending({ data }: Props) {
  const toDate = (date: string) => {
    var newDate = new Date(date).toString().split(" ")
    return newDate[1] + " " + newDate[2] + " "
  }

  return (
    <div className="border-b border-[e6e6e6] pt-10 mb-6 md:mb-16">
      <div className="flex space-x-4 items-center px-14 max-w-7xl m-auto  mb-5">
        <TrendingUpIcon />
        <h2 className="text-sm font-semibold">TRENDING ON MEDIUM</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-14 max-w-7xl m-auto">
        {data.slice(0, 5).map((post, i) => (
          <div key={i} className="flex mb-5">
            <span className="font-bold text-3xl text-[#e6e6e6] mr-5">
              0{i + 1}
            </span>
            <div>
              <div className="flex mb-3">
                <img
                  className="h-5 w-5 object-cover rounded-full mr-2"
                  src={urlFor(data[i].author.image).url()!}
                  alt="author profile picture"
                />
                <p className="text-sm font-medium">{data[i].author.name}</p>
              </div>
              <p className="font-bold mb-2">{data[i].title}</p>
              <div>
                <span className="font-thin text-sm text-[#757575]">
                  {toDate(data[i]._createdAt)} • {data[i].timeToRead} read
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trending
