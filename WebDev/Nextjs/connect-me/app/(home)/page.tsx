import { Button } from '@/components/ui/button'
import { onBoardUser } from '@/modules/auth/actions'
import ClaimLinkForm from '@/modules/home/components/claim-link-form'
import { getCurrentUsername } from '@/modules/profile/actions'
import Link from 'next/link'

import React from 'react'

const HomePage = async() => {
  const user = await onBoardUser()
  const profileDetils = await getCurrentUsername()

  console.log(profileDetils)

  return (
    <div className='min-h-screen'>
      <main className='text-center space-y-8 py-32'>
        <div className='space-y-6'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight'>Everything you are!
            <br></br>
          <span className='text-[#ff38de]'>
            In One Simple Link.
          </span>
          </h1>

          <p className='text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-tight'>
            Connect-Me is your all-in-one link hub — organize and share everything that defines you in one simple page. Whether it’s your social profiles, portfolio, or favorite content, Get your audience discover you effortlessly.
          </p>
          
          {
            user.sucess && profileDetils?.username ? <div className='pt-4'>
            <Link href='/admin/my-page'>
              <Button size='lg' className='px-8 py-4 text-lg font-medium cursor-pointer'>Connect-Me Dashboard</Button>
            </Link>
          </div> 
          : <></>
          }

          

          <section className='pb-16 md:pb-24'>

            {
              user.sucess && profileDetils?.username ? <></> :  <div className='max-w-md mx-auto'>
              <ClaimLinkForm></ClaimLinkForm>
            </div>
            }
          
           
          </section>

        </div>
      </main>
      
    </div>
  )
}

export default HomePage
