import useBillboard from '@/hooks/useBillboard'
import useInfoModal from '@/hooks/useInfoModal'
import { useCallback } from 'react'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from '../PlayButton'

const Billboard = () => {
  const { billboard } = useBillboard()
  const { openModal } = useInfoModal()

  const handleOpenModal = useCallback(() => {
    openModal(billboard.id)
  }, [billboard?.id, openModal])

  return (
    <div className="relative h-[56.25vw]">
      <video
        src={billboard?.videoUrl}
        poster={billboard?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="
        w-full 
        h-[56.25vw]
        object-cover
        brightness-[60%]
        transition
        "
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
          text-white 
          text-1xl 
          md:text-5xl 
          h-full w-[50%] 
          lg:text-6xl 
          font-bold 
          drop-shadow-xl
          "
        >
          {billboard?.title}
        </p>
        <p
          className="
          text-white
          text-[8px]
          md:text-lg
          mt-3
          md:mt-8
          w-[90%]
          md:w-[80%]
          lg:w-[50%]
          drop-shadow-xl
          "
        >
          {billboard?.description}
        </p>
        <div className="flex items-center gap-3 mt-3 md:mt-4">
          <PlayButton movieId={billboard?.id} />
          <button
            onClick={handleOpenModal}
            className="
            flex
            items-center
            bg-white
            bg-opacity-30
            hover:bg-opacity-20
            text-white
            rounded-md
            w-auto
            py-1 md:py-2
            px-2 md:px-4
            text-xs lg:text-lg
            font-semibold
            transition
            "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard
