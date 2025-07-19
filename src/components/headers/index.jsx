"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify,Moon,Sun } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Header = ({ user, profileInfo }) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
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
      label:"Applications",
      path:"/applications",
      show:profileInfo?.role==="recruiter"
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
      <header className="flex h-16 w-full shrink-0 items-center sticky top-0 z-50 justify-between  md:px-6 lg:px-8 xl:px-12 lg:py-12 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center w-full max-w-none">
          <Sheet className="lg:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden bg-transparent hover:bg-transparent p-2">
                <AlignJustify className="h-6 w-6 text-gray-900 dark:text-white"/>
                <span className="sr-only">Toggle Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white dark:bg-black">
              <div className="grid mt-6 gap-20 py-10 justify-center items-center xs:text-xl sm:text-2xl md:text-4xl">
                {menuItems.map((item, index) => (
                  item.show ? (
                    <Link 
                      key={index} 
                      className={`flex w-full items-center py-2 text-md font-semibold transition-colors duration-200 ${
                        pathname === item.path 
                          ? 'text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400 pl-4' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 pl-8'
                      }`}
                      onClick={() => sessionStorage.removeItem("filterParams")} 
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  ) : null
                ))}
                {theme === "light" ? (
                  <Moon
                    className="cursor-pointer mb-4"
                    fill="dark"
                    onClick={() => setTheme("dark")}
                  />
                ) : (
                  <Sun
                    className="cursor-pointer mb-4"
                    fill="light"
                    onClick={() => setTheme("light")}
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>

          
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none lg:flex-grow lg:mr-6">
            <Link className="font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl dark:text-white text-gray-900" href={"/"}>
              CareerPilot
            </Link>
          </div>

          <nav className="hidden lg:flex items-center ml-auto mr-4">
            <div className="flex gap-6 items-center"> 
              {menuItems.map((item, index) =>
                item.show ? (
                  <Link
                    key={index}
                    className={`relative h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium lg:text-lg transition-all duration-200 ${
                      pathname === item.path 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-600 dark:border-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
              {theme === "light" ? (
                <Moon
                  className="cursor-pointer lg:text-2xl mt-2" // Removed mb-4 to align with other items
                  fill="dark"
                  onClick={() => setTheme("dark")}
                />
              ) : (
                <Sun
                  className="cursor-pointer lg:text-2xl mt-2" 
                  fill="light"
                  onClick={() => setTheme("light")}
                />
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