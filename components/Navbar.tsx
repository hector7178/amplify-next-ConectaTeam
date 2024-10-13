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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavBar() {
  return (
    <header className="w-full h-[15vh] backdrop-blur-lg bg-white/30 fixed flex flex-row justify-start z-40 p-10 items-start">
      <div className="basis-1/2">
        <Image src={'/logo.svg'} alt="logo" width={100} height={100} className="w-[15vw] h-[7vh] min-w-[180px]  "/>
     
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

        <NavigationMenuItem >
          <Link href="/aboutus" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Sobre nosotros
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
              <ListItem href="/documentation/?search=instalacion" title="Vinculacion">
                viculación descripción
              </ListItem>
              <ListItem href="/documentation/?search=configuracion" title="Bot configuración">
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
          <Link href="/auth/signin" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Iniciar sesión
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
        </NavigationMenu>
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden bg-transparent">
                <MenuIcon className="h-8 w-8" />
                <span className="sr-only">menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs ">
              <nav className="grid gap-6 text-lg font-medium mt-12">
               
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-6 w-6" />
                 Inicio
                </Link>
                <Link
                  href="/aboutus"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <SearchIcon className="h-6 w-6" />
                  Sobre nosotros
                </Link>
                <Link
                  href="/price"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-6 w-6" />
                  Precios y paquetes
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <QuestionMarkCircledIcon className="h-6 w-6" />
                  FAQ
                </Link>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
