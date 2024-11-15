import React from 'react'
import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Page() {
  return (
    <>
    <NavBar/>
    <main className='p-20 pt-[18vh] flex flex-col md:flex-row h-screen'>
        <div className='basis-1/2 hidden md:flex '>

        </div>
        <div className='basis-1/2 flex flex-col gap-6 items-center md:items-start'>
           <h1 className='text-customText text-5xl font-semibold'>  Sobre nosotros</h1> 
           <div className='flex flex-col gap-4'>
             <h4 className='text-2xl font-semibold text-slate-600 md:text-start text-center'>Juntos somos la mejor herramienta para tu negocio</h4>
              <p className='text-md font-semibold text-slate-400 md:text-start text-center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.

              </p>
              <p className='text-md font-semibold text-slate-400 md:text-start text-center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.

              </p>
              <p className='text-md font-semibold text-slate-400 md:text-start text-center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.

              </p>
           </div>
          
            <Button variant={"ghost"} className='bg-customColorBg rounded-lg text-white w-fit h-fit p-4 py-2 text-lg'>
                <Link href={"/price"}>Empieza ya</Link>
            </Button>
        </div>
        
    </main>
    <Footer/>
    </>
  )
}

export default Page