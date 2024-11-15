"use client"

import React, { useState } from 'react'
import Footer from '@/components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LogsIcon, MenuIcon, Search, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import NavBar from '@/components/Navbar'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Fourth from './Fourth'
import Second from './Second'
import Third from './Third'
import Init from './Init'

function Page() {

  const searchParams = useSearchParams()

  const [open,setOpen]=useState(true)

  console.log(searchParams.get("query"))
  return (
    <main className='overflow-hidden'>
    <NavBar/>
    <section className='flex flex-row md:flex-row h-screen relative'>
        <section className={`${open?" -translate-x-full md:translate-x-0 ":" translate-x-0 "} w-3/4 md:w-1/4 h-screen bg-neutral-100 pt-[16vh] p-4 absolute md:relative transition-all duration-300 ease-in-out z-40`}>
        <div className='flex flex-row'>
          <XIcon onClick={()=>setOpen(e=>!e)} className='flex md:hidden text-white rounded-full hover:scale-105 w-9 h-9 rounded-full absolute top-12 right-6 bg-customColorBg '></XIcon>
        </div>
        <ul className={`flex flex-col gap-8 divide-y`}>
          <li className='list-none text-lg'><Link className={`${searchParams.get("query") === "conectateam" ? "text-customText ":"text-neutral-800 " }`} href={"/documentation/?query=conectateam"}>¿Que es ConectaTeam?</Link></li>
          <li className='list-none text-lg'><Link className={`${searchParams.get("query") === "integracion" ? "text-customText ":"text-neutral-800 " }`} href={"/documentation/?query=comienza"}>Comienza</Link></li>
          <li className='list-none text-lg'><Link className={`${searchParams.get("query") === "integracion" ? "text-customText ":"text-neutral-800 " }`} href={"/documentation/?query=integracion"}>Integración</Link></li>
          <li className='list-none text-lg'><Link className={`${searchParams.get("query") === "integracion" ? "text-customText ":"text-neutral-800 " }`} href={"/documentation/?query=configuracion"}>Configuración</Link></li>
        
        </ul>
       </section>
        <section  className={`w-full md:w-3/4 pt-[18vh] p-4 relative`} >
        
        <div className=' flex flex-row gap-4'>
          <LogsIcon onClick={()=>setOpen(e=>!e)} className=' text-white rounded-full hover:scale-105 w-10 h-10 rounded-full bg-customColorBg md:bg-customText p-2 '/>
          <h1 className='text-customText text-3xl font-bold'>Documentación</h1>
        </div>
        
        {searchParams.get("query") === "integracion" ?<Fourth/>:
        searchParams.get("query") === "comienza" ?<Second/>:
        searchParams.get("query") === "configuracion" ?<Third/>:
        <Init/>
        }
        </section>
    </section>
    <Footer/>
    </main>
  )
}

export default Page