import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

import { Movie } from '@prisma/client'

const useBillboard = () => {
  const {
    data: billboard,
    isLoading,
    error,
  } = useSWR<Movie>('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return { billboard, isLoading, error }
}

export default useBillboard
