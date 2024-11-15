import React from 'react'
import NavBar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { cn } from '../../lib/utils'
import { BellRing, Check, SwitchCamera, SwitchCameraIcon } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel'
import { despriptionPlanBasic, despriptionPlanCompleto, despriptionPlanFree } from '../constants'

type CardProps = React.ComponentProps<typeof Card>
function Price({ className, ...props }: CardProps) {
    

    

      const cards=[{name:"PRUEBA GRATIS",description:despriptionPlanFree, price:"0"},{name:"BASICO",description:despriptionPlanBasic, price:"6"},{name:"COMPLETO",description:despriptionPlanCompleto, price:"15"}]
  return (
    <>
    <NavBar/>
    <main className='p-10 pt-16 md:p-20  md:pt-[22vh] h-fit min-h-[130vh] flex flex-col items-center gap-8'>
      <h1 className='text-3xl md:text-5xl text-customText font-bold text-center'>
        No esperes más e impulsa tu negocio con nosotros
      </h1>
      <p className='text-lg md:text-xl text-slate-500 font-semibold text-center'>
      Ofrecemos una variedad de paquetes diseñados para satisfacer tus necesidades específicas. Cada paquete incluye una combinación de servicios y beneficios exclusivos. ¡Encuentra el tuyo hoy mismo! </p>
    <div className='flex flex-col  gap-8 lg:flex-row p-2 '>

    <Carousel className="w-full max-w-xs md:hidden ">
      <CarouselContent>
        {cards.map((item, index) => (
          <CarouselItem key={index}>
            <Card className={cn("w-[300px] relative ", className)} {...props}>
                <CardHeader className=''>
                  <CardTitle className='text-xl text-customText'>{item.name}</CardTitle>
                  <CardDescription>descripción del paquete</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 h-full">
                  
                  <div>
                    {item.description.map((notification, index) => (
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-customColorBg" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className='flex item-center flex-col justify-center absolute bottom-0'>
                  <span className='text-lg p-4 font-bold'>Precio: {item.price +" $"}</span>
                  <Link href={'/login/?option='+ item.name +'&price='+ item.price}>
                  <Button className="w-full bg-customColorBg text-white hover:scale-105">
                    <Check className="mr-2 h-4 w-4" /> Empieza ya 
                  </Button>
                  </Link>
                  
                </CardFooter>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='scale-150 ' />
      <CarouselNext className='scale-150 ' />
    </Carousel>
    {cards.map((item, index) => (
        
            <Card key={index} className={cn("w-[300px] hidden md:flex flex-col justify-between", className)} {...props}>
                <CardHeader>
                  <CardTitle className='text-xl text-customText'>{item.name}</CardTitle>
                  <CardDescription>Descripción del paquete</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 flex flex-col h-full justify-start items-start ">
                  
                  <div>
                    {item.description.map((notification, index) => (
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-customColorBg" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className='item-center justify-center flex flex-col'>
                <span className='text-lg p-4 font-bold'>Precio: {item.price}$</span>
                 
                  <Link href={'/login/?plan='+ item.name +'&price='+ item.price}>
                  <Button className="w-full bg-customColorBg text-white">
                    <Check className="mr-2 h-4 w-4" /> Empieza ya 
                  </Button>
                  </Link>
                  
                </CardFooter>
              </Card>

        ))}
    </div>
   

    </main>
    <Footer/>
    </>
  )
}

export default Price