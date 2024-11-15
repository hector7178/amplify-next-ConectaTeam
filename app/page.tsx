"use client"

import Triangule from '@/components/ornaments/Triangule'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Form from '@/components/Form'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from "framer-motion";
import Graficas from '../components/icons/Graficas'
import Decor1 from '../components/icons/Decor1'
import Decor from '../components/icons/Decor'
import Home from '../components/icons/Home'
import Arrow from '../components/icons/Arrow'
import FavoriteChart from '../components/icons/FavoriteCharts'
import PresentationChart from '../components/icons/PresentationChart'
import IconEmployed from '../components/icons/IconEmployed'
import IconChatBot from '../components/icons/Chatbot'
import Dashboard from '../components/icons/Dashboard'
import { logConFirma } from '../utils/console'
import { UserSearch } from 'lucide-react'

export default function Page() {
  const [animate,setanimated]=useState('opacity-0 translate-y-[40vh]')
  const [sections,setSection]=useState(0)
  useEffect(()=>{
    logConFirma("nuevo log"+new Date().toLocaleString)
  },[])

  const { scrollY,scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, "change", () => {
  
      setSection(()=>{
        return (scrollYProgress.get()>0.10 && scrollYProgress.get()<0.34 )?1:(scrollYProgress.get()>0.34 && scrollYProgress.get()<0.54 )?2:(scrollYProgress.get()>0.54)?3:0
      })
    
  })
  
  useEffect(()=>{
    if (animate==='opacity-0 translate-y-[40vh]'){
      setanimated('opacity-100 transition-all ease-in-out duration-700 translate-y-0 ')
    }  
  },[animate])

 
    
  
  return (
 
    <main className="flex flex-col w-full h-fit relative overflow-x-hidden" >
      <Navbar />
      <section className={` p-10 pt-20 w-full h-screen bg-purpple-50 relative overflow-hidden flex md:flex-row flex-col justify-between`}>
       
       <Triangule className={`  opacity-100 transition-all ease-in-out duration-700 translate-y-0 delay-300 z-20 w-[40vw] h-[40vw] min-h-[300px] min-w-[300px] rounded-[18%] bg-gradient-to-r from-transparent to-[#976cf5] absolute bottom-5 right-10 rotate-[30deg]`} />
        <Triangule className={`hidden sm:flex opacity-100 transition-all ease-in-out duration-700 translate-y-0 delay-300 z-20 w-[20vw] h-[20vw] min-h-[200px] min-w-[200px] rounded-[8%] bg-gradient-to-r from-transparent to-[#976cf5] absolute top-16 left-10 rotate-[200deg]`} />
        <Arrow  className={`opacity-100 transition-all ease-in-out duration-700 translate-y-0 delay-300 absolute bottom-[27%] md:bottom-[10%] -left-2 z-30`}/>

        <div className=" relative z-20 basis-1/2 h-full pt-16 md:p-10 flex flex-col gap-6 justify-center">
          <h1 className={`${animate} delay-100 text-customText text-5xl lg:text-6xl font-bold  `}>La mejor CRM Para tu negocio</h1>
          <span className={`${animate} delay-200 opacity-90 text-neutral-700 text-md`}>Nuestro sistema centraliza y automatiza la atención al cliente en un solo lugar, brindándote herramientas avanzadas para gestionar de manera eficiente cada conversación. </span>    
          <div className={`${animate} flex flex-row gap-4 delay-300`} >
            <button className="p-2 w-fit h-fit rounded-lg text-md bg-customText text-white font-bold hover:scale-105 transition-transform duration-600 ease-in-out hover:shadow-lg">Empieza ya </button>
            <button className="p-2 w-fit h-fit rounded-lg text-md text-customText border-2 border-customText font-bold bg-white hover:scale-105 transition-transform duration-600 ease-in-out hover:shadow-lg">Precios</button>
            
          </div>
        </div>
        <div className=" relative z-20 basis-1/2 ">
          <Home className={`${animate} delay-300 w-full h-full min-w-[350px] min-h-[350px] absolute -bottom-20 -right-20 md:right-0`}/>
        </div>
        
      </section>
      <section className="w-full h-[10vh] bg-customColorBg relative items-center justify-center flex">
       <h5 className='text-white text-sm md:text-lg text-center'>Promocion para nuevos usuarios, 50% de descuento. No te lo pierdas!!</h5>
      </section>
      <section className="w-full h-[90vh] bg-purpple-50 relative flex flex-col md:flex-row overflow-hidden">
      <Triangule className={`${sections>=1 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 z-20 w-[40vw] h-[40vw] min-h-[400px] min-w-[400px] rounded-[18%] bg-gradient-to-r from-transparent to-customColorBg absolute -top-5 left-10 -rotate-[150deg]`} />
       
        <div className="basis-1/2 hidden md:flex flex-col items-center relative ">
        <Graficas color={"#620d8d"} className={`${sections>=1 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 w-[35vw] h-[20vw] delay-300  absolute bottom-[5%] right-[15%] z-30 hidden md:flex`}/>
        
        <Decor1 color={"#620d8d"} className={`${sections>=1 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 delay-200 w-[12vw] h-[8vw] absolute  top-[25%] right-[8%] z-30 hidden md:flex`}/>

        <Decor color={"#620d8d"} className={`${sections>=1 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 delay-300 w-[16vw] h-[8vw] absolute  top-[8%] left-[30%] z-30 hidden md:flex`}/>
        
        </div>
        <div className="basis-1/2 p-16 flex flex-col items-start justify-center gap-8 relative z-30  md:mt-0 "> 
          <h3 className={`${sections>=1 ? 'translate-x-0 ': 'translate-x-[100vw] '} transition-transform ease-in-out duration-700 text-customText text-5xl font-bold text-center md:text-start`}>
          Automatiza tus procesos
          </h3>
          <ul className={`${sections>=1 ? 'translate-x-0 ': 'translate-x-[100vw] '} w-full transition-transform ease-in-out duration-700  flex flex-col gap-4 md:p-10 `}>
            <li className="flex flex-row gap-4 ">
              <FavoriteChart color='#9675fb' className=' w-[50px] h-[35px]'/>
              <div className="flex flex-col gap-2">
                <span className="text-neutral-600 text-xl font-bold">Analisis de ventas</span>
                <p className='text-xs text-neutral-600'>Obtén una visión completa del rendimiento de tus ventas con métricas clave y tendencias de compra.
                </p>
              </div>
            </li>
            <li className="flex flex-row gap-4 ">
              <PresentationChart  color='#9675fb' className=' w-[50px] h-[35px]'/>
              <div className="flex flex-col gap-2">
                <span className="text-neutral-600 text-xl font-bold">Analisis de marketings</span>
                <p className='text-xs text-neutral-600'>Mide la efectividad de tus campañas en tiempo real y ajusta tus esfuerzos para maximizar el alcance y la conversión. </p>
              </div>
            </li>
            <li className="flex flex-row gap-4 ">
              <UserSearch color='#9675fb' className=' w-[35px] h-[35px]'/>
              <div className="flex flex-col gap-2">
                <span className="text-neutral-600 text-xl font-bold">Analisis de empleados</span>
                <p className='text-xs text-neutral-600'>Evalúa el desempeño y productividad de tu equipo con análisis detallados. </p>
              </div>
            </li>
            
          </ul>

        </div>
      </section>
      <section className="w-full h-screen bg-purple-200 relative justify-center flex flex-col md:flex-row">
        
       
          <div className="basis-1/2 md:pl-24 p-8 md:p-16 flex flex-col items-center md:items-start justify-center gap-8 relative z-30 "> 
            <h3 className={`${sections>=2 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 text-customText text-5xl font-bold text-center md:text-start `}>
            Programa tu bot de respuestas automaticas
            </h3>
            <div className={`${sections>=2 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700  flex flex-col gap-4 `}>
              
              <h4 className='text-2xl font-semibold text-neutral-800 md:text-start text-center'>Con total integracion con tu negocio </h4>
              <p className='text-md font-semibold text-neutral-700 md:text-start text-center'>
              Configura respuestas rápidas y efectivas que resuelvan dudas frecuentes y manten a tus clientes siempre atendidos. Optimiza tu tiempo y mejora la experiencia del usuario en cada interacción.

              </p>
            </div>

          </div>
       
        <div className="basis-1/2 p-10 flex items-center justify-center">
           <IconChatBot className={`${sections>=2 ? 'translate-x-0 ': 'translate-x-[100vw] '} drop-shadow-xl transition-transform ease-in-out duration-700 delay-100 w-3/4 h-3/4`}/>
        </div>
      </section>
      <section className="w-full h-screen bg-purpple-50 relative  flex flex-col md:flex-row md:p-14">
      <Triangule className={`${sections>=3 ? 'translate-x-0 ': 'translate-x-[100vw] '} transition-transform ease-in-out duration-700 z-10 w-[30vw] h-[30vw] min-h-[400px] min-w-[400px] rounded-[18%] bg-gradient-to-r from-transparent to-customColorBg absolute -top-25 -right-10 -rotate-[60deg] hidden md:flex `} />
       
        <div className="basis-1/2 p-10 hidden  md:flex items-center justify-center">
          <Dashboard className={`${sections>=3 ? 'translate-x-0 ': '-translate-x-[100vw] '} transition-transform ease-in-out duration-700 delay-100 w-3/4 h-3/4  `}/>
        </div>
        <div className="basis-1/2  p-16 flex flex-col items-center md:items-start justify-center gap-8 relative z-30 ">
          
        
        <h3 className={`${sections>=3 ? 'translate-x-0 ': 'translate-x-[100vw] '} w-full transition-transform ease-in-out duration-700 text-customText text-4xl font-bold text-center md:text-end `}>
            Accede a métricas clave en un solo lugar para tomar decisiones informadas
            </h3>
            <div className={`${sections>=3 ? 'translate-x-0 ': 'translate-x-[100vw] '} transition-transform ease-in-out duration-700  flex flex-col gap-4 `}>
              
             <p className='text-md font-semibold text-neutral-500 md:text-end text-center'>
             Visualiza en tiempo real el rendimiento de tus ventas, marketing y atención al cliente. Simplifica el análisis de datos y potencia el crecimiento de tu negocio con reportes claros y detallados.
              </p>
            </div>

          

        </div>
        
          
      </section>
      <section className="w-full h-screen bg-customColorBg  relative flex overflow-hidden ">
       
        <div className=" w-full h-full rounded-b-[12rem]  bg-purple-100 flex md:flex-row flex-col gap-4 p-10 pt-20">
          <div className="basis-1/2 md:flex hidden relative ">
            <span  className="w-[35vw] h-[35vw] min-w-[400px] min-h-[400px] absolute -bottom-1/4 left-1/4  bg-customColorBg rounded-full"/>
            <div className="absolute top-[10%] left-1/4 flex flex-col gap-4">
              <h4 className="text-customText text-4xl font-bold">Contáctanos</h4>
              <p className="text-md text-neutral-700 w-3/4"> ¿Tienes alguna duda o necesitas asistencia? Llena nuestro formulario de contacto y nos pondremos en contacto contigo a la brevedad.</p>
            </div>
            <Image src={'/persona.svg'} alt="person" className="w-3/4 h-3/4 min-w-[400px] min-h-[400px] absolute -bottom-10  left-1/4 z-10" width={100} height={100}/>

          </div>
          <div className="basis-1/2 flex flex-col gap-6 justify-center items-center">
              <div className="flex flex-col gap-4 md:hidden items-center ">
                  <h4 className="text-customText text-4xl font-bold">Contáctanos</h4>
                  <p className="text-md text-neutral-700 w-3/4 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mi at ex rutrum semper interdum eget enim. Sed rutrum eu libero et ultrices.</p>
              </div>
             <Form/>
            
          </div>
        </div>
      <Toaster/>
      </section>
      <Footer/>
    </main>
  );
}
