import type { NextApiRequest, NextApiResponse } from 'next'
import { dbCon } from '../../libs/models'

type Data = {
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(400).json({ error: 'Invalid API Route' })
}
