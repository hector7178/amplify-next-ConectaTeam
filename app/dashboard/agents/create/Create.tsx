'use client'
import React from 'react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../../components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Label } from '../../../../components/ui/label'
import { Input } from '../../../../components/ui/input'
import { FetchUserAttributesOutput } from 'aws-amplify/auth'
import { PasswordField, PhoneNumberField, SelectField, TextField } from '@aws-amplify/ui-react'

interface prop {
  session:FetchUserAttributesOutput,
  agents:Object,
  admins:any,
  country:Array<{name:
      {common:string,
      official:string,
      nativeName:{
        eng:{
          official:string,
          common:string
        }}},
        tld:[string],
        cca2:string,
        ccn3:string,
        cca3:string,
        independent:string,
        status:string,
        unMember:string,
        currencies:{SHP:{name:string,symbol:string}},
        idd:{root:string,suffixes:[string]},
        capital:[string],
        altSpellings:[string],
        region:string,languages:{eng:string},
        translations:{
          ara:{
            official:string,
            common:string},
          bre:{
            official:string,
            common:string
          },
          ces:{official:string,
            common:string},
            cym:{
              official:string,common:string},
            deu:{
              official:string,
              common:string},
            est:{official:string,
              common:string},
            fin:{official:string,
              common:string},
            fra:{official:string,
              common:string},
            hrv:{official:string,
              common:string},
            hun:{official:string,
              common:string},
            ita:{official:string,
              common:string},
            jpn:{official:string,
              common:string},
            kor:{official:string,common:string},
            nld:{official:string,
              common:string},
            per:{official:string,
              common:string},
            pol:{official:string,
            common:string},
            por:{official:string,
              common:string},
            rus:{official:string,
                common:string},
            slk:{official:string,
                  common:string},
            spa:{official:string,
              common:string},
            srp:{official:string,
              common:string},
            swe:{official:string,common:string},
            tur:{official:string,
              common:string},
            urd:{official:string,
            common:string},
            zho:{official:string,common:string}},
            latlng:[number,number],landlocked:string,area:string,
            demonyms:{eng:{f:string,
            m:string}},
            flag:string,
            maps:{googleMaps:string,
              openStreetMaps:string},
            population:string,
            car:{signs:[string],side:string},
            timezones:[string],continents:[string],
            flags:{
            png:string,
            svg:string 
            },
            coatOfArms:{},
            startOfWeek:string,
            capitalInfo:{latlng:[]}}>

}

function Create({session,agents,admins,country}:prop) {


  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial ').required('Contraseña es requerida'),
    confirmPassword: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial ').required('confirmación es requerida'),
    name: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Usuario es requerido'),
    phone: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Telefono es requerido')
  
  })
  const { handleSubmit, formState: { errors }, register, getValues,setValue } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async () => {
   
    // try {
    //   const signupResponse = await fetch('/api/signup', {
    //     method: 'POST',

    //     body: JSON.stringify({
    //       email: getValues('email'),
    //       password: getValues('password'),
    //       name: getValues('username'),
    //       idCompany: session.id_company,
    //       company: session.company,
    //       rol: 'agent'
    //     })
    //   })

    //   if (signupResponse?.ok) {
    //     revalidatePath("/dashboard/agent")
    //     return redirect('/dashboard/agents')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }
  console.log(getValues("confirmPassword"))
  return (
    <section className='p-10'>
      <h2 className='text-3xl text-customText font-bold'>Crear nuevo agente</h2>
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
            <TextField
              errorMessage={errors.email?.message}
              onChange={(e)=>setValue("email",e.target.value)}
              descriptiveText="Por favor ingresa el correo electronico"
              label="Correo" 
              type="email" 
              name='email'
              isRequired={true}
              placeholder='example@gmail.com'
              />
            </div>

            <div className='d-flex flex-column '>
            <PasswordField
                errorMessage={errors.password?.message}
                onChange={(e)=>setValue("password",e.target.value)}
                autoComplete="Contraseña"
                descriptiveText="Por favor ingresa la contraseña"
                label="Contraseña"
                name="password"
                size="small"
                placeholder="**********"
              />
            </div>

            <div className='d-flex flex-column '>
              <PasswordField
                errorMessage={errors.confirmPassword?.message}
                onChange={(e)=>setValue("confirmPassword",e.target.value)}
                autoComplete="Repetir la contraseña"
                descriptiveText="Por favor repite la contraseña"
                label="Confirma la contraseña"
                name="confirmPassword"
                size="small"
                placeholder="**********"
              />
            </div>
            <div className='d-flex flex-column '>
            <SelectField
              label="Pais"
              descriptiveText="Selecciona un pais"
            >
              {country?.map((item, index)=>{
                return <option key={index} value={item?.name?.common}>{item?.name?.common}</option>
              })}
                
              
            </SelectField>
            </div>
            <div className='d-flex flex-column '>
            <PhoneNumberField
              errorMessage={errors.phone?.message}
              onChange={(e)=>setValue("phone",e.target.value)}
              defaultDialCode="+1"
              label="Teléfono"
              name="phone"
              descriptiveText="por favor ingresa el numero de telefono"
              placeholder="234-567-8910"
            />
            </div>
        
        <Button type="submit" className='bg-customColorBg text-white hover:purple-950'>Registrar nuevo agente</Button>
        </form>
    </section>
  )
}

export default Create