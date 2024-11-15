'use client'
import {Button} from '../../../../components/ui/button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import GenerateToken from '../../../../lib/TokenGen'  

function RegisterAccount ({data,serverUri}:any) {


  const router = useRouter()
  const [errorRes, setErrorRes] = useState('')
  const [generate, setGenerate] = useState(false)
  const [dataWebhook, setDataWebhook] = useState<any>({})
 console.log(serverUri)
  const schema = yup.object({
    token_auth: yup.string().required('token de autorizacion requerido'),
    id_number: yup.string().required('id de numero es requerido')
  })

  const changeGenerate = () => {
    setGenerate(true)
  }
  useEffect(() => {
    if (data && serverUri) {
      const res = async () => await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: data.user.rol === 'agent' ? data.user.id_company : data.user._id }) })
      res().then((res) => {
        res.json().then(async (data) => {
          const update = await fetch('/api/connect/conn_whatsapp', {
            method: 'POST',

            body: JSON.stringify({
              companyId: data.profile?._id,
              idPhone: 'empty',
              tokenAuthorization: 'empty',
              tokenWebhook: GenerateToken(50),
              webhookPath: `${serverUri}/whatsapp/${data.profile?.company}/webhook`
            })
          })

          if (update?.ok) {
            update.json().then((res) => setDataWebhook(res?.message)).catch(err => console.error(err))
          }
        })
      })
    }
  }, [data,serverUri])

  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async (e:any) => {
    try {
      const verify = await fetch(`https://graph.facebook.com/${getValues('id_number')}?access_token=${getValues('token_auth')}`)
      const verifyRes = await verify.json()
      if (!verifyRes.error) {
        if (verifyRes.id === getValues('id_number')) {
          const res = async () => await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: data.user.rol === 'agent' ? data.user.id_company : data.user._id }) })
          res().then((res) => {
            res.json().then(async (data) => {
              const update = await fetch('/api/connect/conn_whatsapp', {
                method: 'POST',

                body: JSON.stringify({
                  companyId: data.user.rol === 'agent' ? data.user.id_company : data.user._id,
                  idPhone: getValues('id_number'),
                  tokenAuthorization: getValues('token_auth'),
                  tokenWebhook: GenerateToken(50),
                  webhookPath: `${serverUri}/whatsapp/${data.profile?.company}/webhook`
                })
              })

              if (update?.ok) {
                const res = async () => await fetch('/api/edit/company', { method: 'POST', body: JSON.stringify({ ...data.profile, id: data.profile._id, whatsapp: true }) })
                res().then((res) => {
                  res.json().then((r) => console.log(r))
                })
                router.refresh()
              }
            })
          })
        } else {
          setErrorRes('Error,datos no validos')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex flex-col gap-4 p-10'>
    <div>
      <h3 className='text-2xl font-bold text-teal-500'>Conecta tu cuenta de whatsapp</h3>
    </div>
    <div className='p-4 flex flex-col gap-4 item-center justify-center'>

        {data
            ? <form onSubmit={handleSubmit(submitchange)} className='flex flex-col gap-4 w-1/2'>
            <span className='text-danger'>{errorRes}</span>
            <div className='flex flex-col gap-2'>
                <label className='text-neutral-700 text-lg'>Token de autorización</label>
                <span className='text-red-500 text-sm'>{errors?.token_auth?.message}</span>
                <input {...register('token_auth')} className='text-lg p-2 w-full h-fit rounded-lg border-2 border-teal-400'></input>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-neutral-700 text-lg'>Id telefono</label>
                <span className='text-red-500 text-sm'>{errors?.id_number?.message}</span>
                <input {...register('id_number')} className='text-lg p-2 w-full h-fit rounded-lg border-2 border-teal-400'></input>
            </div>
            <div className='flex flex-col gap-2 '>
                  <label className='text-neutral-700 text-lg'>Ruta webhook</label>
                  <input  className='bg-neutral-200 p-2 text-lg rounded-lg' defaultValue={dataWebhook?.webhook_path} disabled/>
                </div>
                <div className='flex flex-col gap-2 '>
                  <label className='text-neutral-700 text-lg' >Token webhook</label>
                  <input className='bg-neutral-200 p-2 text-lg rounded-lg'  defaultValue={dataWebhook?.token_webhook} disabled/>
                </div>
            <Button type='submit' className=' fs-5 p-2 rounded'>Conectar</Button>
            </form>
          
          : <span>Estado de la cuenta: No conectada</span>}
    </div>
    </section>
  )
}

export default RegisterAccount