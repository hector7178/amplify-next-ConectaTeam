'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from './ui/button'

function Form () {
  const router = useRouter()

  const notifyError = () => toast('mensaje de error.');
  const notifySuccess= () => toast('mensaje de exito.');

  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    name: yup.string().min(8, 'min 8 caracteres').required('Nombre es requerido'),
    message: yup.string().min(8, 'min 8 caracteres').required('Mensaje es requerida'),
     })
  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async (e:any) => {
    try {
      const signupResponse = await fetch('/api/contact/form', {
        method: 'POST',

        body: JSON.stringify({
          email: getValues('email'),
          name: getValues('name'),
          message: getValues('message')
        })
      })

      if (signupResponse?.ok) {
        return notifySuccess
      }
    } catch (error) {
        notifyError()
    }
  }

  return (
   <>
   <Toaster/>

          <form method='POST' onSubmit={handleSubmit(submitchange)} className='p-6 bg-white rounded-xl flex flex-col gap-4 w-3/4 p-8 shadow-xl'>
          
            <div className='flex flex-col'>
              <span className=''></span>
            <label className='text-lg text-teal-400 font-semibold' >Nombre</label>
            <span className='text-danger error'>{errors?.name?.message}</span>
            <input
             {...register('name', { required: true })}
            className='rounded-lg text-lg h-fit w-full p-2 border-2 border-teal-400 text-neutral-800'
            type='text'
            name='name'/>
            </div>
            <div className='flex flex-col'>
              <span className=''></span>
            <label className='text-lg text-teal-400 font-semibold' >Correo</label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <input
             {...register('email', { required: true })}
            className='rounded-lg text-lg h-fit w-full p-2 border-2 border-teal-400 text-neutral-800'
            type='email'
            name='email'/>
            </div>
            <div className='flex flex-col '>
            <label className='text-lg text-teal-400 font-semibold' >Mensaje</label>
            <span className='text-danger error'>{errors?.message?.message}</span>
            <textarea
             {...register('message', { required: true })}
            className='rounded-lg text-lg h-fit w-full p-2 border-2 border-teal-400 text-neutral-800'
            name='message'/>
            </div>
            <Button
            type='submit'
            className='rounded-lg bg-teal-400 px-4 p-2 hover:scale-105 transition-transform duration-400 ease-in-out'
            >Enviar</Button>
            </form>
</>
  )
}

export default Form
