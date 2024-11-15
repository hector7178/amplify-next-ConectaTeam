import React from 'react'
import Settings from './settings'
import { redirect } from 'next/navigation'

async function page() {
  return (
    <Settings></Settings>
  )
}

export default page