'use client'

import { cn } from '@/lib/utils'
import { Button } from '@nextui-org/react'
import { Github } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { Icons } from './Icons'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    // If there's a session, it means the user is authenticated.
    if (session) {
      setIsLoading(false);
    }
  }, [session]);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      setIsLoading(false);
      toast.error('There was an error logging in with Google');
    }
  }

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      await signIn('github');
      // Do not setIsLoading(false) here.
    } catch (error) {
      setIsLoading(false);
      toast.error('There was an error logging in with Github');
    }
  }

  return (
    <div className={ cn('flex flex-col space-y-5 justify-center', className) } { ...props }>
      <Button
        isLoading={ isLoading }
        type='button'
        size='sm'
        className='w-full'
        onClick={ loginWithGoogle }
        disabled={ isLoading }>
        { isLoading ? null : <Icons.google className='h-4 w-4 mr-2' /> }
        { isLoading ? 'Please wait...' : 'Google' }
      </Button>
      <Button
        isLoading={ isLoading }
        type='button'
        size='sm'
        className='w-full'
        onClick={ loginWithGithub }
        disabled={ isLoading }>
        { isLoading ? null : <Github className='h-4 w-4 mr-2' /> }
        { isLoading ? 'Please wait...' : 'Github' }
      </Button>
    </div>
  )
}

export default UserAuthForm