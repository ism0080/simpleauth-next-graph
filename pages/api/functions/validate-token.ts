import jwt from 'jsonwebtoken'

export const verifyToken = (token: string) => {
  if (!token) return null
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET)
  } catch {
    return null
  }
}
