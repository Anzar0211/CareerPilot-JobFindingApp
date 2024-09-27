"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {AlignJustify} from "lucide-react"
import { UserButton } from "@clerk/nextjs"



const Header = ({user,profileInfo}) => {
  const menuItems=[
  {
    label:"Home",
    path:"/",
    show:true
  },
  {
    label:"Login",
    path:"/sign-in",
    show:!user
  },
  {
    label:"Register",
    path:"/sign-up",
    show:!user
  },
  {
    label:"Jobs",
    path:"/jobs",
    show:user
  },
  {
    label:"Activity",
    path:"/activity",
    show:profileInfo?.role==="candidate"
  },
  {
    label:"Membership",
    path:"/membership",
    show:user
  },
  {
    label:"Account",
    path:"/account",
    show:user
  }
]
  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center sticky top-0 z-50">
        <Sheet className="lg:hidden">
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6"/>
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <Link href={'#'} className="mr-6 hidden lg:flex">
            CareerPilot
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((item,index)=>(
                item.show ? <Link key={index} className="flex w-full items-center py-2 text-lg font-semibold" onClick={()=>sessionStorage.removeItem("filterParams")} href={item.path}>{item?.label}</Link>
                : null
              ))}
            </div>
            <UserButton afterSignOutUrl="/" className="z-50"/>
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6 font-bold text-3xl" href={"/"}>
        CareerPilot
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {
            menuItems.map((item,index)=>(
              item.show ? <Link key={index} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium" href={item.path}>
                {item.label}
              </Link>
              : null
            ))
          }
          <UserButton afterSignOutUrl="/" className="z-50"/>
        </nav>
      </header>
    </div>
  )
}
export default Header