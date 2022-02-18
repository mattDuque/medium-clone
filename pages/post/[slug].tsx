import React, { useState } from "react"
import Header from "../../components/Header"
import PortableText from "react-portable-text"
import { GetStaticProps } from "next"
import { sanityClient, urlFor } from "../../sanity"
import { Post, Comment } from "../../typings"
import { dateFormatter, toDate } from "../../lib/utils"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface Props {
  post: Post
}

interface FormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const Schema = yup.object().shape({
  name: yup.string().required("- You need to say your name"),
  email: yup
    .string()
    .email("- Check if your email is correct")
    .required("- You need to provide an email"),
  comment: yup.string().required("- You need to write something"),
})

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  })

  console.log(dateFormatter(post.comments[0]._createdAt))

  const onSubmit: SubmitHandler<FormInput> = data => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .catch(() => {
        setSubmitted(false)
        alert("Sorry there was an error sending your comment, try again")
      })
    reset()
  }
  console.log(post.comments)
  return (
    <main>
      <Header />
      <article className="max-w-3xl mx-auto p-5">
        <div className="flex">
          <img
            className="h-12 w-12 object-cover rounded-full mr-2"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <div>
            <p className="">{post.author.name}</p>

            <span className="font-thin text-sm text-[#757575]">
              {toDate(post._createdAt)} • {post.timeToRead} read
            </span>
          </div>
        </div>
        <h1 className="text-3xl mt-10 mb-3 font-bold">{post.title}</h1>
        <h2 className="text-xl font-light mb-2">{post.description}</h2>
        <div>
          <img
            className="h-auto w-full object-cover my-10"
            src={urlFor(post.mainImage).url()!}
            alt=""
          />
        </div>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
          serializers={{
            h1: (props: any) => (
              <h1 className="text-2xl font-bold my-5" {...props} />
            ),
            h2: (props: any) => (
              <h1 className="text-xl font-bold my-5" {...props} />
            ),
            li: ({ children }: any) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            link: ({ href, children }: any) => <a href={href}>{children}</a>,
            image: (props: any) => (
              <img className="my-10" src={urlFor(props).url()!} alt="" />
            ),
          }}
        />
      </article>
      <hr />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-[#FFC017] text-white max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">Tank you for commenting!</h1>
          <h3>Your comment is pending approval, please be patient</h3>
        </div>
      ) : (
        <form
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-sm text-[#ffc017]">Enjoyed the article?</h4>
          <h3 className="text-3xl font-bold">Leave a comment below</h3>
          <hr className="my-3" />

          <input
            {...register("_id")}
            name="_id"
            type="hidden"
            value={post._id}
          />
          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name")}
              name="name"
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#ffc017]"
              placeholder="John Doe"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email")}
              name="email"
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#ffc017]"
              placeholder="johndoe@email.com"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment")}
              name="comment"
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-[#ffc017]"
              placeholder="Text"
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5 text-red-500">
            {errors?.name && <span>{errors.name?.message}</span>}
            {errors?.email && <span>{errors.email?.message}</span>}
            {errors?.comment && <span>{errors.comment?.message}</span>}
          </div>
          <button
            type="submit"
            id="submit"
            className="shadow bg-[#ffc017] hover:bg-opacity-75 focus:shadow-outline 
          foucus:outline-none text-white font-bold py-2 px-4 rounded cursor pointer"
          >
            Send
          </button>
        </form>
      )}
      <hr />
      <div className="flex flex-col p-10 my-10 max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl">Comments</h1>
        <hr className="pb-2" />
        {post.comments.map((comment: Comment) => (
          <div key={comment._id}>
            <p>
              <span className="font-bold">{comment.name}</span>:{" "}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
      _id,
      slug {
        current
      }
    }
    `
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    description,
    mainImage,
    slug,
    body,
    timeToRead,
    author -> {
      name, 
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true
    ],
  }
  `
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return { notFound: true }
  } else
    return {
      props: { post },
      revalidate: 60,
    }
}
