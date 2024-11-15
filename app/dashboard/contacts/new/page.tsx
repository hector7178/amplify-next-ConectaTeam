"use client"
import React, { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { PhoneNumberField, SelectField, TextField } from '@aws-amplify/ui-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

function page() {

    const [type,setType]=useState("")
    const schema = yup.object({
        account: yup.string().required('Cuenta requerida es requerido'),
        name: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Usuario es requerido'),
        
        identify: yup.string().min(2, 'min 2 caracteres').max(16, 'max 16 caracteres').required('Telefono es requerido')
      
      })
    const { handleSubmit, formState: { errors }, register, getValues,setValue } = useForm({ resolver: yupResolver(schema) })
    
const submitchange=()=>{

}
console.log(getValues("account"))

  return (
    <section className='p-10'>
    <h2 className='text-3xl text-customText font-bold'>Crear nuevo Contacto</h2>
    <form onSubmit={handleSubmit(submitchange)} className='p-10 flex flex-col gap-4 w-1/2 min-w-[300px]'>
          <div className='d-flex flex-column'>
          <TextField
            errorMessage={errors.name?.message}
            onChange={(e)=>setValue("name",e.target.value)}
            descriptiveText="Por favor el nombre y apellido"
            label="Nombre" 
            type="text" 
            name='name'
            isRequired={true}
            placeholder='Nombre y Apellido'
            />
          </div>
          <div className='d-flex flex-column'>
          <SelectField
            errorMessage={errors.account?.message}
            onChange={(e)=>{
                setType(e.target.value)
                setValue("account",e.target.value)}}
            descriptiveText="Seleccioma el tipo de cuenta del contacto"
            label="Tipo de cuenta" 
            name='account'
            isRequired={true}
            placeholder='selecciona...'
            >
                <option value="whatsapp">Whatsapp</option>
                <option value="instagram">Instagram</option>
                <option value="messenger">Messenger</option>

            </SelectField>
          </div>

          <div className='d-flex flex-column '>
          {type=="whatsapp"?
          
          <PhoneNumberField
            errorMessage={errors.identify?.message}
            onChange={(e)=>setValue("identify",e.target.value)}
            defaultDialCode="+1"
            label="Teléfono"
            name="identify"
            descriptiveText="por favor ingresa el numero de telefono"
            placeholder="234-567-8910"
          />
          :type=="instagram"||type=="messenger"?
          <TextField
            errorMessage={errors.identify?.message}
            onChange={(e)=>setValue("identify",e.target.value)}
            descriptiveText="Por favor el nombre y apellido"
            label="Nombre de usuario o correo" 
            type="text" 
            name='identify'
            isRequired={true}
            placeholder='@usuario o correo@dominio.com'
            />
            :null
        }
          </div>
      
      <Button type="submit" className='bg-customColorBg text-white hover:purple-950'>Registrar nuevo agente</Button>
      </form>
  </section>

  )
}

export default page