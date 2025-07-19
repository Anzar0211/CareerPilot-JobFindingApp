import { currentUser } from "@clerk/nextjs/server"
import Header from "../headers"
import Footer from "../footer"
import { fetchProfileAction } from "@/actions";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const CommonLayout = async({children,...props}) => {
  const user=await currentUser();
  const profileInfo=await fetchProfileAction(user?.id);

  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))}/>
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
        <Footer />
      </div>
    </NextThemesProvider>
  )
}
export default CommonLayout