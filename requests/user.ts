import axios from 'axios'

import { loginMutation, registerMutation, logoutMutation } from './mutations'
import { meQuery } from './queries'

const API_ENDPOINT = '/api'

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(API_ENDPOINT, {
      query: loginMutation,
      variables: {
        email,
        password
      }
    })
    return JSON.parse(data.data.login)
  } catch (error) {
    console.log(error)
  }
}

export const registerUser = async ({ email, name, password }) => {
  try {
    const { data } = await axios.post(API_ENDPOINT, {
      query: registerMutation,
      variables: {
        email,
        name,
        password
      }
    })
    console.log('register', data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
    let res = await axios.post(API_ENDPOINT, {
      query: meQuery
    })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const { data } = await axios.post(API_ENDPOINT, {
      query: logoutMutation
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
