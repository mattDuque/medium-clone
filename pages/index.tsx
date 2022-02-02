import Head from 'next/head'
import Link from "next/link"
import Banner from "../components/Banner"
import Header from "../components/Header"
import PostCard from "../components/PostCard"
import { sanityClient } from "../sanity"
import { Post } from "../typings"
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Banner />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
          {posts.map(post => (
            <PostCard data={post} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
    _id, 
    title,
    slug,
    mainImage,
    description,
    author ->{
    name, 
    image
   }
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
