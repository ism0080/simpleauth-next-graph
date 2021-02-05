import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { registerValidation, loginValidation } from '../functions/validation'
import { createUserPutObject, putData } from '../db/putObject'
import { constants } from '../functions/constants'
import { createTable } from '../db/createTable'
import { doesEmailExist } from '../db/queryEmail'

export const resolvers = {
  Query: {
    me: (parent, args, ctx, info) => {
      const { user } = ctx
      if (!user) return new AuthenticationError('Not Authenticated')
      return { email: user.userEmail, name: user.userName }
    }
  },
  Mutation: {
    devCreateTable: async () => {
      try {
        createTable()
        return 'Table Created Successfully'
      } catch (error) {
        console.log(error)
        return 'Failed to create table'
      }
    },
    register: async (parent, args, context, info) => {
      const { error } = registerValidation(args)
      if (error) {
        console.log(error.message)
        return new UserInputError(error.message)
      }

      const isEmailExist = await doesEmailExist(args.email)
      if (isEmailExist.Count > 0) {
        return new UserInputError('Account already exists', {
          email: args.email
        })
      }

      // hash password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(args.password, salt)

      const user: User = {
        name: args.name,
        email: args.email,
        password: hash
      }

      try {
        const params = createUserPutObject(process.env.DB_TABLENAME, user)
        await putData(params)

        return `Created User ${args.email}`
      } catch (error) {
        console.log(error)
        return new ApolloError('Could not write to database', constants.dbErrorCode)
      }
    },
    login: async (parent, args, context, info) => {
      const { error } = loginValidation(args)
      if (error) {
        console.log(error.message)
        return new UserInputError(error.message)
      }

      const user = await doesEmailExist(args.email)
      if (user.Count === 0) return new UserInputError('Invalid Login')

      const userPassword = await bcrypt.compare(args.password, user.Items[0].info.password)

      if (!userPassword) return new UserInputError('Invalid Login')

      const token = jwt.sign({ userEmail: user.Items[0].email, userName: user.Items[0].info.name }, process.env.TOKEN_SECRET, {
        expiresIn: '7d'
      })

      context.cookies.set('id', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === 'production'
      })

      const response = {
        error: null,
        data: {
          message: 'Login Successful',
          token
        }
      }

      return JSON.stringify(response)
    },
    logout: (parent, args, ctx) => {
      ctx.cookies.set('id', { expires: Date.now() })

      return 'Logged Out'
    }
  }
}
