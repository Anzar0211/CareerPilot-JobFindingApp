'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader,DialogTitle } from "../ui/dialog"
import CommonForm from "../common-form"
import { initialPostNewJobFormData, postNewJobFormControls, recruiterToasts } from "@/utils"
import { createJobAction } from "@/actions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"


const PostNewJob = ({user,profileInfo,jobList}) => {

    // console.log(jobList,"jobList");

    const{toast}=useToast()

    const handleAddNewJob=()=>{
        if(!profileInfo?.isPremiumUser && jobList.length>=2){
            toast({
                title:recruiterToasts[0].title,
                description:recruiterToasts[0].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        else if(profileInfo?.isPremiumUser && jobList.length>=5){
            toast({
                title:recruiterToasts[1].title,
                description:recruiterToasts[1].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        else if(profileInfo?.isPremiumUser && jobList.length>=10){
            toast({
                title:recruiterToasts[2].title,
                description:recruiterToasts[2].description,
                action:<Link className="text-nowrap text-white text-sm bg-black p-3" href={'/membership'}>Upgrade Plan</Link>
            })
            return;
        }
        setShowDialog(true)
    }

    const handlePostJobBtnValid=()=>{
        return Object.keys(jobFormData).every(control=>jobFormData[control].trim()!=="")
    }
    const[showDialog,setShowDialog]=useState(false);
    const[jobFormData,setJobFormData]=useState({
        ...initialPostNewJobFormData,
        companyName:profileInfo?.recruiterInfo?.companyName
    })
    const createJob=async()=>{
        try {
            await createJobAction({
                ...jobFormData,
                recruiterId:user?.id,
                applicants:[]
            },'/jobs')
            setJobFormData({
            ...initialPostNewJobFormData,
            companyName:profileInfo?.recruiterInfo?.companyName
            })
            setShowDialog(false)
            toast({
                title:'Job Posted',
                description:'Job Posted Successfully',
            })
        } catch (error) {
            toast({
                variant:"destructive",
                title:"Something went wrong"
            })
        }

    }
  return (
    <div>
        <Button onClick={handleAddNewJob} className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
            Post New Job
        </Button> 
        <Dialog open={showDialog} onOpenChange={()=>setShowDialog(false)}>
            <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
            <DialogTitle className="hidden"></DialogTitle>
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <div className="grid gap-4 py-4">
                        <CommonForm
                            buttonText={'List New Job'}
                            formData={jobFormData}
                            setFormData={setJobFormData}
                            formControls={postNewJobFormControls}
                            isBtnDisabled={!handlePostJobBtnValid()}
                            action={createJob}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}
export default PostNewJob