import useSWR from 'swr'
import { Movie } from '@prisma/client'

import fetcher from '@/libs/fetcher'

const useMovieList = () => {
  const {
    data: movies = [],
    isLoading,
    error,
  } = useSWR<Movie[]>('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return { movies, isLoading, error }
}

export default useMovieList
