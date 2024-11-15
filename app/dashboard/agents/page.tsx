import React from 'react'
import List from './List'
import { redirect } from 'next/navigation'

async function Page() {

  return (
    <List data={[]}/>
  )
}

export default Page