import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

import { verifyToken } from './functions/validate-token'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res)
  const token = cookies.get('id')
  const user = verifyToken(token)

  res.status(200).json({ isAuth: user ? true : false })
}
