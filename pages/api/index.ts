import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'

const cors = Cors()

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const handler = server.createHandler({ path: '/api' })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
