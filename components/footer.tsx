import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='w-screen h-fit flex flex-row justify-between px-24  p-16 bg-teal-500 '>
      <div className='flex '>
        <Image src="./logowhite.svg" alt='logo' width={180} height={180}/>
      </div>
      <div className='flex flex-row p-10 gap-6  items-start '>
        <div>
          <ul className='flex flex-col gap-2 w-1/2 mr-10'>
            <li><Link href={"/"} className='text-white text-lg'>Inicio</Link></li>
            <li><Link href={"/aboutus"} className='text-white text-lg'>Sobre nosotros</Link></li>
            <li><Link href={"/price"} className='text-white text-lg'>Precios</Link></li>
          </ul>
        </div>
        <div>
          <ul className='flex flex-col gap-2'>
          <li><Link href={"/documentation"} className='text-white text-lg'>Documentacion</Link></li>
          <li><Link href={"/help"} className='text-white text-lg'>Ayuda</Link></li>
          <li><Link href={"/register"} className='text-white text-lg'>Registrate</Link></li>
          </ul>
          
        </div>
      </div>

    </footer>
  )
}

export default Footer