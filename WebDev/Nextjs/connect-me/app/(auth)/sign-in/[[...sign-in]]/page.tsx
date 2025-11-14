import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='flex flex-col items-center justify-center h-screen dark:bg-neutral-900 dark:text-neutral-100'>
      <h1 className='text-2xl font-bold pb-4'>Welcome to ConnectMe!</h1>
      <SignIn></SignIn>
      <p className='text-sm font-thin pt-2'>Please signIn to continue ,if new user then create account</p>

    </div>
  )
}