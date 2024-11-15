
import React from 'react'
import { redirect } from 'next/navigation'
import Accounts from './Accounts'

async function Page() {
 
  return (
    <Accounts data={[]}></Accounts>
  )
}

export default Page