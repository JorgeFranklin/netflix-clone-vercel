export type MobileMenuProps = {
  visible?: boolean
}

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) {
    return null
  }

  return (
    <div className="flex flex-col absolute top-8 left-0 w-56 py-5 border-2 bg-black border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
