'use client'
import React from 'react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '../../../../../components/ui/label'
import { Input } from '../../../../../components/ui/input'

interface prop {
  session:{
    email: String;
    password: String;
    company: String;
    whatsapp: Boolean;
    instagram: Boolean;
    messenger: Boolean;
    id_company: String;
    rol: String;
  }
}

function Edit({session}:prop) {

  const router = useRouter()

  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial ').required('Contraseña es requerida'),
    username: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Usuario es requerido')
  })
  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async () => {
    try {
      const signupResponse = await fetch('/api/signup', {
        method: 'POST',

        body: JSON.stringify({
          email: getValues('email'),
          password: getValues('password'),
          username: getValues('username'),
          idCompany: session.id_company,
          company: session.company,
          rol: 'agent'
        })
      })

      if (signupResponse?.ok) {
        router.refresh()
        return router.push('/dashboard/agent')
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <section className='p-10'>
      <h2 className='text-4xl text-teal-600'>Editar agente</h2>
      <form onSubmit={handleSubmit(submitchange)} className='p-10 flex flex-col gap-4'>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <Label className='' >Usuario</Label>
            <span className='text-danger error'>{errors?.username?.message}</span>
            <Input
             {...register('username', { required: true })}
            className='Input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='text'
            name='username'></Input>
            </div>
            <div className='d-flex flex-column'>
            <Label className='' >Correo</Label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <Input
             {...register('email', { required: true })}
            className='Input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='email'
            name='email'></Input>
            </div>

            <div className='d-flex flex-column '>
            <Label className='' >Contraseña</Label>
            <span className='text-danger error'>{errors?.password?.message}</span>
            <Input
             {...register('password', { required: true })}
            className=' Input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='password'
            name='password'></Input>
            </div>
            
        
        <Button type="submit">Registrar</Button>
        </form>
    </section>
  )
}

export default Edit