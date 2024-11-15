'use client'

"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { DollarSign, Home, HomeIcon, LineChart, MenuIcon, Package, Package2Icon, PanelLeft, SearchIcon, Settings2, ShoppingCart, Users2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import Logo from "./icons/Logo"


export default function NavBar() {
  return (
    <header className="w-full h-[15vh] backdrop-blur-lg bg-white/30 fixed flex flex-row justify-start z-[1000] p-10 items-start">
      <div className="basis-1/2">
        <Logo className="w-1/3 h-3/4 min-h-[50px] min-w-[200px]"  color={"#620d8d"}/>
      </div>
      <div className="flex basis-1/2 items-end justify-end">
        <NavigationMenu className=" hidden md:flex ">
      <NavigationMenuList className=" flex flex-row items-end justify-end">

    
        <NavigationMenuItem >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

     

        <NavigationMenuItem>
          <NavigationMenuTrigger>Comienza ya</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 bg-gray-100">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md  p-6 no-underline outline-none focus:shadow-md"
                    href="/price"
                  >
                    <DollarSign className="w-8 h-8 "/>
                    <div className="mb-2 mt-4 text-lg font-medium">
                     Precios y paquetes
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explora nuestro paquetes y precios, para que elijas el que mejor se adapte a tus necesidades
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/documentation" title="Documentación">
                introduccion description
              </ListItem>
              <ListItem href="/documentation/?query=instegracion" title="Vinculacion">
                viculación descripción
              </ListItem>
              <ListItem href="/documentation/?query=configuracion" title="Bot configuración">
                configuracion bot
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
        <NavigationMenuItem >
          <Link href="/faq" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             FAQ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem >
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Iniciar sesión
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
        </NavigationMenu>
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden bg-transparent relative z-[1001]">
                <MenuIcon className="h-8 w-8" />
                <span className="sr-only">menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs ">
              <nav className="grid gap-6 text-lg font-medium mt-12">
               
                <Link
                  href="/"
                  className=" bg-transparent flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105"
                >
                  <Home className="h-6 w-6" />
                 Inicio
                </Link>
                
                <Link
                  href="/price"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105"
                >
                  <Package className="h-6 w-6" />
                  Precios y paquetes
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105"
                >
                  <QuestionMarkCircledIcon className="h-6 w-6" />
                  FAQ
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105"
                >
                  <Users2 className="h-6 w-6" />
                 Iniciar sesión
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
      </div>
      
    </header>
    
  )
}

const ListItem =  React.forwardRef<
React.ElementRef<"a">,
React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
