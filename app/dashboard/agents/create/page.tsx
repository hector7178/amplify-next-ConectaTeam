
import React from 'react'
import { redirect } from 'next/navigation'
import Create from './Create'
import { AuthGetCurrentUserAtribServer, AuthGetCurrentUserServer, cookiesClient } from '../../../../utils/server-utils'
const verifyUser=async ()=>{
  const user = await AuthGetCurrentUserServer();

  const userAtrib = await AuthGetCurrentUserAtribServer();

  if(!user){
      redirect("http://localhost:3000/login")
  }

  const profile= await cookiesClient.models.Profile.list({filter:{
      user:{
          contains:user.userId
      }
  }})
 
  const company= await cookiesClient.models.Company.get({id:profile.data[0]?.company!})
  
  
  if(!company.data){
    return  redirect("http://localhost:3000/checkout")
  }
  return {userAtrib,company}
} 
async function Page() {
    const data = await verifyUser()
    const agents=await data.company.data?.agents()
    const admins= await data.company.data?.admins()
      try {
        const country= await fetch("https://restcountries.com/v3.1/all",{
          method:"GET"
        })
    
        const dataCountry= await country.json()
        return (
          <Create session={data.userAtrib!} agents={agents?.data!} admins={admins?.data!} country={dataCountry.sort((a:any,b:any)=> a.name.common.localeCompare(b.name.common))}/>
        )
      } catch (error) {
        console.log(error)
        return redirect("/dashboard/agents")
      }
  
    
}

export default Page