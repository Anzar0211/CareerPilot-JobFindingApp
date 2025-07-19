'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button"

const HomePageButton = ({ user, profileInfo }) => {
    const router=useRouter()
  return user ? (
    profileInfo.role === "candidate" ? (
      <div className="flex gap-3 sm:space-x-3">
        <Button onClick={()=>router.push('/jobs')} className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Browse Jobs
        </Button>
        <Button onClick={()=>router.push('/activity')} variant="outline" className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          View Activity
        </Button>
      </div>
    ) : (
      <div className="flex gap-3 sm:space-x-3">
        <Button onClick={()=>router.push('/jobs')} className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Post Jobs
        </Button>
        <Button onClick={()=>router.push('/applications')} variant="outline" className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          View Applications
        </Button>
      </div>
    )
  ) : (
    <div className="flex  gap-3 sm:space-x-3">
      <Button onClick={()=>router.push('/onboard')} className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Browse Jobs
      </Button>
      <Button onClick={()=>router.push('/onboard')} variant="outline" className="flex h-11 md:h-12 lg:h-14 items-center justify-center px-5 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-medium border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
        Post Jobs
      </Button>
    </div>
  );
};

export default HomePageButton