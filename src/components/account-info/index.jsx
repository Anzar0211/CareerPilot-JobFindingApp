'use client'

import { candidateOnboardFormControls, initialCandidateFormData, initialCandidateUpdateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils"
import { useEffect, useState } from "react"
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

const AccountInfo = ({profileInfo}) => {
    const[candidateFormData,setCandidateFormData]=useState(initialCandidateUpdateFormData);
    const[recruiterFormData,setRecruiterFormData]=useState(initialRecruiterFormData);

    useEffect(()=>{
        if(profileInfo?.role==='candidate') setCandidateFormData(profileInfo?.candidateInfo);
        if(profileInfo?.role==="recruiter") setRecruiterFormData(profileInfo?.recruiterInfo);
    },[profileInfo])
    // console.log(candidateFormData);

    const handleUpdateAccount=async()=>{
        await updateProfileAction(profileInfo?.role==="candidate"?{
            _id:profileInfo?._id,
            userId:profileInfo?.userId,
            email:profileInfo?.role,
            role:profileInfo?.role,
            isPremiumUser:profileInfo?.isPremiumUser,
            memberShipType:profileInfo?.memberShipType,
            memberShipStartDate:profileInfo?.memberShipStartDate,
            memberShipEndDate:profileInfo?.memberShipEndDate,
            candidateInfo:{
                ...candidateFormData,
                resume:profileInfo?.candidateInfo?.resume
            }
        }:{
            _id:profileInfo?._id,
            userId:profileInfo?.userId,
            email:profileInfo?.role,
            role:profileInfo?.role,
            isPremiumUser:profileInfo?.isPremiumUser,
            memberShipType:profileInfo?.memberShipType,
            memberShipStartDate:profileInfo?.memberShipStartDate,
            memberShipEndDate:profileInfo?.memberShipEndDate,
            recruiterInfo:{
                ...recruiterFormData,

            }
        },"/account")
    }

  return (
    <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between pb-6 border-b pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-950">Account Details</h1>
        </div>
        <div className="py-20 pb-24 pt-6">
            <div className="container mx-auto p-0 space-y-8">
                <CommonForm
                    action={handleUpdateAccount}
                    formControls={
                        profileInfo?.role==="candidate" ? candidateOnboardFormControls.filter(formControl=>formControl.name!=="resume") : recruiterOnboardFormControls
                    }
                    formData={profileInfo?.role==='candidate'?candidateFormData:recruiterFormData}
                    setFormData={profileInfo?.role==='candidate'?setCandidateFormData:setRecruiterFormData}
                    buttonText="Update Profile"
                />
            </div>
        </div>
    </div>
  )
}
export default AccountInfo