import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import Cookies from 'cookies'

import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { verifyToken } from './functions/validate-token'

const cors = Cors({ allowCredentials: true, origin: process.env.CORS_ORIGIN })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    const cookies = new Cookies(req, res)
    const token = cookies.get('id')
    const user = verifyToken(token)
    return {
      cookies,
      user
    }
  }
})

const handler = server.createHandler({ path: '/api' })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
