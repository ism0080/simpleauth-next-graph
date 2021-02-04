import useSWR from 'swr'

import { getAuthStatus } from '../requests/auth'

export default function useAuth() {
  const { data, mutate, error } = useSWR('is_auth', getAuthStatus)

  const authenticated = !error && data?.isAuth

  return {
    authenticated,
    mutate
  }
}
