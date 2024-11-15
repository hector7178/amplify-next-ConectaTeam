import React from 'react'
import Chats from './Chats'
import { redirect } from 'next/navigation';
import { AuthGetCurrentUserAtribServer, AuthGetCurrentUserServer, cookiesClient } from '../../../utils/server-utils';


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
async function page() {

  
let chatsPerAccount:any[]=[];
const {userAtrib,company}=await verifyUser()

  const accounts=await company.data?.accounts();
  accounts?.data.forEach(async (account) => {
    const contacts= await account.contacts() 
      const messages = contacts.data.map(async(element)=>{
        
        const chat=  await element.chat()
        const msjs=  await chat?.data?.messages()
       const msjData= msjs?.data.map((dat):object=>{
          return {id:dat.id, from:dat.from,to:dat.to,status:data.status,text:dat.text,time:dat.time }
        })
        
        return {contact:element.name, msgs:msjData }
      })
    let data={
      type: account.type,
      status:account.status,
      msgs:messages

    }
     chatsPerAccount.push(data)
    
  });

  return (
    <Chats company={company.data!.id} chats={chatsPerAccount}/>
  )
}

export default page