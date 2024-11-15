import React from 'react'
import NavBar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Checkout from './checkout'
import Triangule from '../../components/ornaments/Triangule'
import { AuthGetCurrentUserAtribServer, AuthGetCurrentUserServer, cookiesClient } from '../../utils/server-utils'
import { NextRequest, NextResponse } from 'next/server'
import { handleDeleteUser } from '../../utils/delete-user'
import { redirect } from 'next/navigation'
import { UserPoolIdentityProviderApple } from 'aws-cdk-lib/aws-cognito'

const verifyUser=async ()=>{
    const user = await AuthGetCurrentUserServer();

    const userAtrib = await AuthGetCurrentUserAtribServer();

    if(!user){
        redirect("https://7v0dl1rk-3000.use2.devtunnels.ms/login")
    }

    const profile= await cookiesClient.models.Profile.list({filter:{
       
    }})
    
    const company= await cookiesClient.models.Company.get({id:profile.data[0]?.company!})
    
 
    if(company.data){
      return  redirect("https://7v0dl1rk-3000.use2.devtunnels.ms/dashboard")
    }
    return {userAtrib,user}
}


async function Page() {
    const user = await verifyUser()
    return (
        <section className='flex flex-col'>
            <NavBar/>
            { user && <Checkout user={user.userAtrib} userID={user.user.userId}/>}
            <Footer/>
        </section>
    )
}

export default Page