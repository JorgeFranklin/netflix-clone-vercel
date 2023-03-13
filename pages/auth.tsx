import { useCallback, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import axios from 'axios'

import Input from '@/components/input'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Auth = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      login()
    } catch (error) {
      console.log(error)
    }
  }, [name, email, password, login])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img
            src="/images/logo.png"
            alt="Netflix written in red."
            className="h-12 max-lg:m-auto"
          />

          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 max-md:px-0 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    id="name"
                    label="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={variant === 'login' ? login : register}
                type="button"
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              {variant === 'login' && (
                <div className="flex justify-center items-center gap-4 mt-8 text-black">
                  <div
                    onClick={() =>
                      signIn('google', { callbackUrl: '/profiles' })
                    }
                    className="
                  flex
                  justify-center
                  items-center
                  bg-white
                  w-10 
                  h-10 
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  transition
                  "
                  >
                    <FcGoogle size={30} />
                  </div>
                  <div
                    onClick={() =>
                      signIn('github', { callbackUrl: '/profiles' })
                    }
                    className="
                  flex
                  justify-center
                  items-center
                  bg-white
                  w-10 
                  h-10 
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  transition
                  "
                  >
                    <FaGithub size={30} />
                  </div>
                </div>
              )}
              <p className="text-neutral-500 mt-12 text-center">
                {variant === 'login'
                  ? 'First time using Netflix?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Auth
