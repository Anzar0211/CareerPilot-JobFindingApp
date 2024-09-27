'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button"

const HomePageButton = ({ user, profileInfo }) => {
    const router=useRouter()
  return user ? (
    profileInfo.role === "candidate" ? (
      <div className="flex space-x-3">
        <Button onClick={()=>router.push('/jobs')} className="flex h-11 items-center justify-center px-5">Browse Jobs</Button >
        <Button onClick={()=>router.push('/activity')} className="flex h-11 items-center justify-center px-5">View Activity</Button >
      </div>
    ) : (
      <div className="flex space-x-3">
        <Button onClick={()=>router.push('/jobs')} className="flex h-11 items-center justify-center px-5">Post Job</Button >
        <Button onClick={()=>router.push('/membership')}  className="flex h-11 items-center justify-center px-5">View Membership</Button >
      </div>
    )
  ) : (
    <div className="flex space-x-3">
      <Button onClick={()=>router.push('/onboard')} className="flex h-11 items-center justify-center px-5">Browse Jobs</Button >
      <Button onClick={()=>router.push('/onboard')} className="flex h-11 items-center justify-center px-5">Post Jobs</Button >
    </div>
  );
};

export default HomePageButton