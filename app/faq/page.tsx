import React from 'react'
import NavBar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { Search } from 'lucide-react'
import { Input } from '../../components/ui/input'

function Page() {
  return (
    <>
    <NavBar/>
    <main className='p-20 pt-[18vh] min-h-screen h-fit flex flex-col md:flex-row '>
        <div className='basis-1/2 w-full flex flex-col gap-4 p-6 '>
            <h1 className='text-customText text-5xl font-semibold md:text-start text-center'>Preguntas Frecuentes</h1>
            <h4 className='text-xl font-semibold text-slate-600 md:text-start text-center'>Explora nuestras preguntas frecuentes</h4>
             
            <div className="relative w-full flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </div>
        <div className='basis-1/2 flex flex-col gap-6 items-center md:items-start'>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">Is it styled?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl">Is it animated?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl">Is it animated?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl">Is it animated?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl">Is it animated?</AccordionTrigger>
                    <AccordionContent className="text-xl">
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </div>
        
    </main>
    <Footer/>
    </>
  )
}

export default Page