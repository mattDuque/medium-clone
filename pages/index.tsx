import Head from 'next/head'
import Link from "next/link"
import Header from "../components/Header"
import Banner from "../components/Banner"
import Trending from "../components/Trending"
import PostCard from "../components/PostCard"
import { sanityClient } from "../sanity"
import { Post, Categories } from "../typings"
interface Props {
  posts: [Post]
  categories: [Categories]
}

export default function Home({ posts, categories }: Props) {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-[#ffc017]">
          <Header />
          <Banner />
        </div>
        <Trending data={posts} />
        <div className="flex flex-col-reverse max-w-7xl mx-auto sm: md:flex-row">
          <div className="w-full md:w-2/3 px-6 md:pl-14 ">
            {posts.map(post => (
              <PostCard post={post} />
            ))}
          </div>
          <div className="w-full px-6 mb-10 md:w-1/3 md:pr-14 md:pl-0">
            <p className="text-sm font-bold">
              DISCOVER MORE OF WHAT MATTERS TO YOU
            </p>
            <div className="pb-6">
              {categories.map(category => (
                <p
                  className="text-[#a4a4a4] text-sm border border-[#e6e6e6] rounded-sm py-2 px-4 inline-flex m-1"
                  onClick={() => console.log(category.description)}
                >
                  {category.title}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const postQuery = `*[_type == "post"]{
    _id, 
    _createdAt,
    title,
    slug,
    mainImage,
    description,
    body,
    timeToRead,
    author ->{
    name, 
    image
   }
  }`

  const categoriesQuery = `*[_type == "category"]{
    title,
    description
  }`

  const posts = await sanityClient.fetch(postQuery)
  const categories = await sanityClient.fetch(categoriesQuery)

  return {
    props: {
      posts,
      categories,
    },
  }
}
