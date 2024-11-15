"use client"
import React, { useState } from 'react'
import Culqi from '../../components/Culqi'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'



function Checkout({user, userID}:any) {
  
  const [plan,setPlan]=useState("BASICO")

  const [metodoPago,setMetodoPago]=useState("")

  const [price,setPrice]=useState("50")

  const planes=[{name:"BASICO",price:"50"},{name:"COMPLETO", price:"100"}]

  const metodosDPago=["CULQI"]

  const [active,setActive]=useState(true)
  return (
    <section className='flex flex-col items-center justify-center w-full h-screen gap-6'>
    <div className='flex flex-col gap-6'>
        <h1 className='text-lg md:text-2xl font-bold text-customText'>Selecciona tu plan de suscripción</h1>
        <div className='flex flex-row gap-4 items-center justify-center'>
            {planes.map((item, i)=>{
                return (<Card onClick={()=>{
                    setPlan(item.name)
                    setPrice(item.price)
                    }} key={i} className={` ${plan===item.name? "bg-purple-50 border-2 border-purple-500":" bg-white border-transparent"} transition-all ease-in-out duration-300 flex flex-col intem-start p-4 w-fit h-fit rounded-xl cursor-pointer`}>
                    <CardHeader>
                      <CardTitle><Switch checked={item.name===plan} /></CardTitle>
                      <CardDescription className={`text-md font-bold ${item.name===plan? " text-customText ": " text-neutral-700 "} `}>{item.name}</CardDescription>
                    </CardHeader>
                    <CardContent className='text-neutral-600'>
                      <h4><span className='font-bold'>Precio: </span>{item.price} S/</h4>
                    </CardContent>
                    
                  </Card>)
            })}
        </div>
    </div>
    <div className='flex flex-col gap-6'>
        <h2 className='text-customText text-lg md:text-2xl font-bold'>Selecciona tu metodo de pago disponible</h2> 
        <RadioGroup  >
        {metodosDPago.map((item, i)=>{
            return ( 
            <div onClick={()=>{
              setMetodoPago(item)
              setActive(false)
              }} key={i} className={`${item===metodoPago?" bg-purple-50 border-2 border-purple-500 ":" bg-white border-2 border-white "} flex items-center space-x-2 ease-in-out transition-all duration-300 w-fit h-fit p-4 rounded-xl`}>
              <RadioGroupItem value={item} id={`HTML-${i}`} />
              <Label htmlFor={`HTML-${i}`}>{item}</Label>
            </div>
            ) })}
        </RadioGroup>
    </div>
    <Culqi account={plan} userID={userID} active={active} setActive={setActive} user={user} price={Number(price+"00")} />
    </section>
  )
}

export default Checkout