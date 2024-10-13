'use client'
import React from 'react'
import PropTypes from 'prop-types'
import { redirect, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

function ButtonLogOut() {
  return (
    <button onClick={()=>signOut()} className='text-md p-2'>Cerrar sesión</button>
  )
}


export default ButtonLogOut
