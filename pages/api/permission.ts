import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import Cookies from 'cookies'

import { verifyToken } from './functions/validate-token'
import initMiddleware from './lib/init-middleware'

const cors = initMiddleware(
  Cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET'],
    credentials: true,
    preflightContinue: true
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const cookies = new Cookies(req, res)
  const token = cookies.get('id')
  const user = verifyToken(token)

  res.status(200).json({ isAuth: user ? true : false })
}
