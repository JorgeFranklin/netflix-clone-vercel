import useSWR from 'swr'
import { Movie } from '@prisma/client'

import fetcher from '@/libs/fetcher'

const useMovie = (movieId?: string) => {
  const {
    data: movie,
    error,
    isLoading,
  } = useSWR<Movie>(movieId ? `/api/movies/${movieId}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    movie,
    error,
    isLoading,
  }
}

export default useMovie
