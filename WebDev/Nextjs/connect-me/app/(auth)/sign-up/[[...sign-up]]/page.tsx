import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
     <div className='flex flex-col items-center justify-center h-screen dark:bg-neutral-900 dark:text-neutral-100'>
          <h1 className='text-2xl font-bold pb-4'>Welcome to ConnectMe!</h1>
          <SignUp></SignUp>
          <p className='text-sm font-thin pt-2'>Please sign-up to continue ,if existing user</p>
    
        </div>
  )
}