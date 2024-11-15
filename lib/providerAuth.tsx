"use client"

import { Authenticator } from '@aws-amplify/ui-react'
import React from 'react'

function ProviderAuth({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <Authenticator.Provider>

   {children}
      
    </Authenticator.Provider>
  )
}

export default ProviderAuth