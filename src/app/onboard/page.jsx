import dynamic from 'next/dynamic'

const OnBoard = dynamic(() => import('../../components/on-board'), { ssr: false })
import { currentUser } from "@clerk/nextjs/server"
// import OnBoard from "../../components/on-board"
import { fetchProfileAction } from "@/actions";
import { redirect } from "next/navigation";



const OnboardPage = async() => {
  const user=await currentUser();
  const profileInfo=await fetchProfileAction(user?.id);
  if(profileInfo?._id){
    if(profileInfo?.role==="recruiter" && !profileInfo?.isPremiumUser) redirect("/membership");
    else redirect("/");
  }
  else{
    return <OnBoard/>
  }
  return (
    <OnBoard/>
  )
}
export default OnboardPage