import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './icons/Logo'

function Footer() {
  return (
    <footer className='flex-col flex w-full h-fit bg-customColorBg'>
    <section className='w-screen h-fit flex flex-col md:flex-row justify-between md:px-24  p-16  '>
      <div className='flex flex-col '>
        <Logo color='#ffffff' className="w-1/3 h-3/4 min-h-[50px] min-w-[200px]" />
      </div>
      <div className='flex flex-row py-10 md:p-10 gap-8  items-start '>
        <div>
          <ul className='flex flex-col gap-2 md:mr-10'>
            <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/"} className=' text-md text-white'>Inicio</Link></li>
            <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/aboutus"} className=' text-md text-white'>Sobre nosotros</Link></li>
            <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/price"} className=' text-md text-white'>Precios</Link></li>
            <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/privacypolicy"} className=' text-md text-white'>Politicas de privacidad</Link></li>
          
          </ul>
        </div>
        <div>
          <ul className='flex flex-col gap-2'>
          <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/documentation"} className=' text-md text-white'>Documentación</Link></li>
          <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/help"} className=' text-md text-white'>Ayuda</Link></li>
          <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/register"} className=' text-md text-white'>Regístrate</Link></li>
          <li className='hover:scale-105 hover:text-customColorbg '><Link href={"/term_and_conditions"} className=' text-md text-white'>Terminos y condiciones</Link></li>
          </ul>
          
        </div>
      </div>

    </section>
    <div className='flex item-center justify-center p-6'>
      <span className='text-white text-xs'>ConectaTeam, todos los derechos reservados a IGLAM CA.</span>
    </div>
    </footer>
  )
}

export default Footer