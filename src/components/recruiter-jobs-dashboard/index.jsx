'use client'
import RecruiterJobCard from "../recruiter-job-card"

import { useRouter,} from "next/navigation"

const RecruiterJobsDashboard = ({user,profileInfo,jobList,jobApplications}) => {
    const router = useRouter()
  return (
    <div>
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-baseline justify-between border-b border-gray-200 pb-6 pt-24 md:flex-row">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0">
                    Current Job Applications
                </h1>
            </div>
        </div>
        <div className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                <div className="lg:col-span-4">
                    <div className="container mx-auto space-y-8 p-0">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                            {jobList && jobList.length > 0 ? (
                                jobList.map((job, index) => (
                                    <RecruiterJobCard
                                        key={index}
                                        jobItem={job}
                                        profileInfo={profileInfo}
                                        jobApplications={jobApplications}
                                    />
                                    ))
                                    ) : (
                                        <h1 className="text-3xl font-bold">No Jobs Found!!</h1>
                                    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default RecruiterJobsDashboard