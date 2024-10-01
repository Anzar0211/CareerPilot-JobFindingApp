'use client'

import { Fragment, useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { createJobApplicationAction } from "@/actions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { candidateToasts, } from "@/utils"

const CandidateJobCard = ({jobItem,profileInfo,jobApplications}) => {
    // console.log(jobApplications,"jobApplications");
    // console.log(profileInfo,"profile");
    const{toast}=useToast()
    const[showJobDetailsDrawer,setShowJobDetailsDrawer]=useState(false);
    const handleJobApply=async()=>{
        if(!profileInfo?.isPremiumUser && jobApplications.length>=2){
            toast({
                title:candidateToasts[0].title,
                description:candidateToasts[0].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        else if(profileInfo?.isPremiumUser && jobApplications.length>=5){
            toast({
                title:candidateToasts[1].title,
                description:candidateToasts[1].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        else if(profileInfo?.isPremiumUser && jobApplications.length>=10){
            toast({
                title:candidateToasts[2].title,
                description:candidateToasts[2].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        try {
            await createJobApplicationAction({
                recruiterUserId:jobItem?.recruiterId,
                name:profileInfo?.candidateInfo?.name,
                email:profileInfo?.email,
                candidateUserId:profileInfo?.userId,
                status:['Applied'],
                jobId:jobItem?._id,
                jobAppliedDate:new Date().toLocaleDateString()
            },"/jobs")
            setShowJobDetailsDrawer(false);            
            toast({
                title:"Successfully Applied"
            })
        } catch (error) {
            toast({
                variant:"destructive",
                title:"Something went wrong!"
            })
        }

    }


  return (
    <Fragment>
        <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
            <CommonCard icon={<JobIcon/>} title={jobItem?.title} description={jobItem?.companyName}
            footerContent={
                <Button onClick={()=>setShowJobDetailsDrawer(true)} disabled={jobItem?.isClosed} className="disabled:opacity-25 flex h-11 items-center justify-center px-5">
                    {jobItem?.isClosed===true ? 'Applications Closed' : 'View Details'}
                </Button>
            }
            />
            <DrawerContent className="p-6">
                <DrawerHeader className="px-0">
                    <div className="flex justify-between">
                        <DrawerTitle className="text-4xl font-extrabold text-gray-800">{jobItem?.title}
                        </DrawerTitle>
                        <div className="flex gap-3">
                            <Button onClick={handleJobApply} 
                            disabled={
                                jobApplications.findIndex(item=>item.jobId===jobItem?._id) > -1 ? true : false
                            }
                            className="disabled:opacity-55 flex h-11 items-center justify-center px-5">
                                {
                                    jobApplications.findIndex(item=>item.jobId===jobItem?._id) > -1 ? "Applied" : "Apply"
                                }
                            </Button>
                            <Button className="flex h-11 items-center justify-center px-5" onClick={()=>setShowJobDetailsDrawer(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DrawerHeader>
                <DrawerDescription className="text-2xl font-medium text-gray-600 ">
                    {jobItem?.description}
                    <span className="text-xl font-normal text-gray-500 ml-4">{jobItem?.location}</span>
                </DrawerDescription>
                <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
                    <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>
                </div>
                <h3 className="text-2xl font-medium text-black mt-3">Experience: {jobItem?.experience}
                </h3>

                <div className="flex gap-4 mt-6">
                    {
                        jobItem?.skills.split(',').map((item,index)=>(
                            <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                <h2 className="text-[13px] font-medium text-white">
                                    {item}
                                </h2>
                            </div>
                        ))
                    }
                </div>
            </DrawerContent>
        </Drawer>
    </Fragment>
  )
}
export default CandidateJobCard