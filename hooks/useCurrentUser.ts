import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

import { User } from '@prisma/client'

const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    mutate,
    error,
  } = useSWR<User>('/api/current', fetcher)

  return {
    user,
    isLoading,
    mutate,
    error,
  }
}

export default useCurrentUser
