import useSWR from 'swr'

import { getUser } from '../requests/user'

export default function useUser() {
  const { data, mutate, error } = useSWR('api_user', getUser)

  const loading = !data && !error
  const loggedIn = !error && !data?.errors && data

  return {
    loading,
    loggedIn,
    user: data,
    mutate
  }
}
