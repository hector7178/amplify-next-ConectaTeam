
import Link from "next/link"
import {
  Book,
  Bot,
  CircleUser,
  HomeIcon,
  LifeBuoy,
  Search,
  Settings2,
  SquareUser,
  Users,
  CombineIcon,
  ChevronRight,
  MenuIcon,
  Contact2Icon,
  BookUserIcon

} from "lucide-react"


import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import ButtonLogOut from "@/components/Logout"
import Logo from "../../components/icons/Logo"
import { AuthGetCurrentUserAtribServer, AuthGetCurrentUserServer, cookiesClient } from "../../utils/server-utils"
import { redirect } from "next/navigation"
import { Badge } from "../../components/ui/badge"

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

export default async function Page({children}: Readonly<{
    children: React.ReactNode;
  }>) {

    const data= await verifyUser()
    const sus = await data.company.data?.suscription()
  return (
    <div className="flex min-h-screen w-full flex-col fixed">
      <header className="sticky top-0 flex h-[9vh] items-center gap-4 border-b relative">
      <div className="backdrop-blur-md bg-white/30 absolute z-10 w-full h-full"></div>
       <div className="relative z-20 w-full h-full items-center justify-between flex px-8 ">
          <nav className=" gap-6 text-lg font-medium flex flex-row items-center gap-3 text-sm lg:gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            > <Logo className="w-[120px] h-[25px] md:w-[200px] md:h-[60px]" color={"#976cf5"} />

            </Link>
            <Badge className="bg-customColorBg text-nowrap hover:bg-customText cursor-pointer  md:text-md md:flex hidden">PLAN {sus?.data?.plan?.name||"BASICO"}</Badge>
          </nav>
        
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative md:flex hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
                <Input
                  type="search"
                  placeholder="Busqueda..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-md font-bold text-customText p-2">{data.company.data?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <ButtonLogOut/>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
        </div> 
      </header>
      <div className="grid h-[91vh] w-full pl-[53px]  overflow-y-scroll">
        <aside className="inset-y fixed group/item hover:bg-white left-0 z-20 flex h-[90vh] flex-col border-r w-fit">
          <div className="border-b p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={'/dashboard'} className="hover:bg-[#f5f5f5] flex flex-row  gap-2 items-center justify-start ">
                <Button variant="outline" size="icon" aria-label="Home" className="">
                <HomeIcon className="size-5 fill-foreground" />
                
                </Button>
                <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Inicio</span>
                
              </Link>
            
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
                Inicio
            </TooltipContent>
          </Tooltip>
            
          </div>
          <nav className="grid gap-1 p-2  w-fit">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={'/dashboard/chats'} className="hover:bg-[#f5f5f5] flex flex-row justify-between items-center group/data">
                   <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted flex flex-row p-2 w-fit gap-2"
                  aria-label="Chats"
                >
                  <ChatBubbleIcon className="size-5"  />
                  <span className=" duration-300 ease-in-out transition-all  text-md font-bold text-neutral-600 hidden group-hover/item:flex"> Chats</span>
                  </Button>                 
                <ChevronRight className="uration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                                  
                </Link>
             
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Chats
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={'/dashboard/bot'} className="hover:bg-[#f5f5f5] flex flex-row items-center justify-between group/data ">
                    <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-muted flex flex-row gap-2 p-2 w-fit"
                    aria-label="Configuración del bot"
                    >
                    <Bot className="size-5" />
                    <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Bot</span>
                    </Button>
                    <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                    
                </Link>
                
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Configuración del bot
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>

                <Link href={'/dashboard/agents'} className="hover:bg-[#f5f5f5] group/data flex flex-row items-center justify-between items-center">
                 <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg flex flex-row gap-2 p-2 w-fit "
                  aria-label="API"
                >
                  <Users className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Agentes</span>
                </Button>
                <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                
                </Link>
               
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                configuración de Agentes
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/dashboard/accounts"} className="hover:bg-[#f5f5f5] flex flex-row items-center justify-between group/data">
                 <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg flex flex-row gap-2 p-2 w-fit"
                  aria-label="Documentation"
                >
                  <CombineIcon className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Cuentas</span>
                  
                </Button>
                <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                </Link>
               
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Cuentas vinculadas
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>

                <Link href={'/dashboard/contacts'} className="hover:bg-[#f5f5f5] group/data flex flex-row items-center justify-between items-center">
                 <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg flex flex-row gap-2 p-2 w-fit "
                  aria-label="API"
                >
                  <BookUserIcon className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Contactos</span>
                </Button>
                <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                
                </Link>
               
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Contactos
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={'/dashboard/settings'} className="hover:bg-[#f5f5f5] flex flex-row items-center justify-between group/data">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg flex flex-row gap-2 p-2 w-fit"
                  aria-label="Settings"
                >
                  
                  <Settings2 className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Configuración</span>
                   </Button>
                   <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
               
                </Link>
                
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Configuracíon general
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/help"} className="hover:bg-[#f5f5f5] flex flex-row justify-between items-center group/data">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg flex flex-row gap-2 p-2 w-fit"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Ayuda</span>
                  </Button>
                  <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Ayuda
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/documentation"} className="hover:bg-[#f5f5f5] flex flex-row justify-between items-center group/data">
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg flex flex-row gap-2 p-2 w-fit"
                  aria-label="Account"
                >
                  <Book className="size-5" />
                  <span className="text-md font-bold text-neutral-600 hidden group-hover/item:flex">Documentación</span>
                  </Button>

                  <ChevronRight className="duration-300 ease-in-out transition-all invisible hidden group-hover/item:flex group-hover/data:visible"/> 
                
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentación
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      {children}
      </div>
     
    </div>
  )
}
