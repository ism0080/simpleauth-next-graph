import { ApolloError, UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'

import { registerValidation } from '../functions/validation'
import { createUserPutObject, putData } from '../db/putObject'
import { constants } from '../functions/constants'
import { createTable } from '../db/createTable'
import { doesEmailExist } from '../db/queryEmail'

export const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return { email: 'isaac.mackle@gmail.com', name: 'Isaac' }
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
      //   console.log('parent', parent)
      //   console.log('args', args)
      //   console.log('context', context)
      //   console.log('info', info)
      const { error } = registerValidation(args)
      if (error) {
        console.log(error.message)
        return new UserInputError(error.message)
      }

      const isEmailExist = await doesEmailExist(args.email)
      if (isEmailExist) {
        return new UserInputError('Email already exists', {
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
        const params = createUserPutObject(constants.tableName, user)
        await putData(params)

        return `Created User ${args.email}`
      } catch (error) {
        console.log(error)
        return new ApolloError('Could not write to database', constants.dbErrorCode)
      }
    },
    login: (parent, args, context, info) => {
      return 'Successfully logged in'
    }
  }
}
