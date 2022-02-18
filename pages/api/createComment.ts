// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'

const client = sanityClient

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { _id, name, email, comment } = JSON.parse(req.body)
  
  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name, 
      email,
      comment
    })
  } catch (err: any) {
    res.status(err.statusCode).json(err.details)
  }
  
  res.status(200).json({ message: 'comment submitted' })
}
