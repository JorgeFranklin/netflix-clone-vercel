import fetcher from '@/libs/fetcher'
import { Movie } from '@prisma/client'

import useSWR from 'swr'

const useFavorites = () => {
  const {
    data: favorites = [],
    isLoading,
    mutate,
    error,
  } = useSWR<Movie[]>('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    favorites,
    isLoading,
    mutate,
    error,
  }
}

export default useFavorites
