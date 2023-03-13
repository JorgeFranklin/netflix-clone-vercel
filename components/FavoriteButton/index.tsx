import { useCallback, useMemo } from 'react'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import axios from 'axios'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'

export type FavoriteButtonProps = {
  movieId: string
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { user, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || []

    return list.includes(movieId)
  }, [user, movieId])

  const toggleFavorites = useCallback(async () => {
    let response

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    if (user) {
      mutate({
        ...user,
        favoriteIds: updatedFavoriteIds,
      })
    }

    mutateFavorites()
  }, [isFavorite, movieId, mutate, mutateFavorites, user])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className="
      flex
      justify-center
      items-center
      cursor-pointer
      group/item
      w-6
      h-6
      lg:w-10
      lg:h-10
      border-white
      border-2
      rounded-full
      transition
      hover:border-neutral-300
      "
    >
      <Icon className="text-white" size={20} />
    </div>
  )
}

export default FavoriteButton
