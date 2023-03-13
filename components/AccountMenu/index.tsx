import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

export type AccountMenuProps = {
  visible?: boolean
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { user } = useCurrentUser()

  if (!visible) {
    return null
  }

  return (
    <div className="flex flex-col absolute top-14 right-0 w-56 py-5 border-2 border-gray-800  bg-black">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 px-3 w-full group/item">
          <img
            src="/images/default-blue.png"
            alt=""
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="flex items-center justify-center text-center text-white text-sm hover:underline pb-1"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  )
}

export default AccountMenu
