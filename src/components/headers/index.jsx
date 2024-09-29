"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const Header = ({ user, profileInfo }) => {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user
    },
    {
      label: "Companies",
      path: "/companies",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate"
    },
    {
      label: "Membership",
      path: "/membership",
      show: user
    },
    {
      label: "Account",
      path: "/account",
      show: user
    }
  ]

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center sticky top-0 z-50 justify-between  lg:px-6">
        <div className="flex justify-between items-center w-full ">
          <Sheet className="lg:hidden">
            <SheetTrigger asChild>
              <Button className="lg:hidden">
                <AlignJustify className="h-6 w-6"/>
                <span className="sr-only">Toggle Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <div className="grid gap-2 py-6">
                {menuItems.map((item, index) => (
                  item.show ? (
                    <Link 
                      key={index} 
                      className="flex w-full items-center py-2 text-md font-semibold" 
                      onClick={() => sessionStorage.removeItem("filterParams")} 
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  ) : null
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link className="font-bold md:text-2xl text-xl lg:text-3xl flex-grow text-center lg:flex lg:mr-6" href={"/"}>
            CareerPilot
          </Link>

          <nav className="hidden lg:flex items-center ml-auto">
            <div className="flex gap-6">
              {menuItems.map((item, index) =>
                item.show ? (
                  <Link
                    key={index}
                    className="group h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
            </div>
          </nav>

          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
    </div>
  )
}

export default Header