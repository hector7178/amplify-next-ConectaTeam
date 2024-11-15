
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users, Notebook, CircleUserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AuthGetCurrentUserAtribServer, AuthGetCurrentUserServer, cookiesClient } from "../../utils/server-utils";
import { redirect } from "next/navigation";


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
export default async function Page() {
  let chats=[0];
  let chatsActive=[0];
  const user= await verifyUser()
  const contacts=await user.company.data?.contacts()
  const agents=await user.company.data?.agents()
  const accounts=await user.company.data?.accounts()

  accounts?.data.forEach(async (account)=>{
   const datachats = await account.contacts()
   chats.push(datachats.data.length)
  })

  const chatsTotal= chats.reduce((total, num) => total + num, 0);
 
    return (
      
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contactos
            </CardTitle>
            <Notebook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts?.data.length}</div>
            <p className="text-xs text-muted-foreground">
              
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Agentes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents?.data.length}</div>
            <p className="text-xs text-muted-foreground">
            
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats totales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chatsTotal}</div>
            <p className="text-xs text-muted-foreground">
              
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuentas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts?.data.length}</div>
            <p className="text-xs text-muted-foreground">
              
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Lista de agentes</CardTitle>
              <CardDescription>
                registro de chats por agente
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 bg-customColorBg">
              <Link href="/dashboard/agents">
                Ver todos
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agentes</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Type
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Chats</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[].map((agn:any, index:number)=>{
                  return (
                    <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{agn.username}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {agn.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                     {agn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-24
                  </TableCell>
                  <TableCell className="text-right">150</TableCell>
                </TableRow>
                  )
                })}
                
                
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5 " className="min-h-[40vh]">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Lista de contactos</CardTitle>
            <Button asChild size="sm" className="ml-auto gap-1 bg-customColorBg">
              <Link href="/dashboard/contacts">
                Ver todos
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            
            {contacts?.data.map((item,index)=>{
              return( <div key={index} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback><CircleUserRoundIcon/></AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.identity}
                </p>
              </div>
              <div className="ml-auto font-medium">{item.accountName}</div>
            </div>)
            
            })}
          </CardContent>
        </Card>
      </div>
    </main>
    )
  }
  