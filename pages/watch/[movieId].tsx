import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import useMovie from '@/hooks/useMovie'

const Watch = () => {
  const router = useRouter()

  const { movieId } = router.query

  const { movie } = useMovie(movieId as string)

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
        fixed
        w-full
        p-4
        z-10
        flex
        items-center
        gap-8
        bg-black
        bg-opacity-70
        "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching </span>
          {movie?.title}
        </p>
      </nav>
      <video
        src={movie?.videoUrl}
        autoPlay
        controls
        className="w-full h-full"
      />
    </div>
  )
}

export default Watch
