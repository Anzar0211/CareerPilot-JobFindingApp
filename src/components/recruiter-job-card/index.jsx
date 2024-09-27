'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import JobApplicants from "../job-applicants"

const RecruiterJobCard = ({jobItem,jobApplications}) => {
    // console.log(jobItem,"jobItem");
    // console.log(jobApplications,"jobApplicnats")
    const[showApplicantsDrawer,setShowApplicantsDrawer]=useState(false);
    const[currentCandidateDetails,setCurrentCandidateDetails]=useState(null);
    const[showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal]=useState(false);
  return (
    <div>
        <CommonCard
        icon={<JobIcon/>}
        title={jobItem.title}
        description={jobItem.description}
        footerContent={
            <Button onClick={()=>setShowApplicantsDrawer(true)} className="flex disabled:opacity-55 h-11 items-center justify-center px-5" disabled={jobApplications.filter(item=>item.jobId===jobItem?._id).length===0}>
                {
                    jobApplications.filter(item=>item.jobId===jobItem?._id).length
                }{" "}
                {
                    jobApplications.filter(item=>item.jobId===jobItem?._id).length>1 ? "Applicants" : "Applicant"
                }
            </Button>
        }
        />
        <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(applicant=>applicant.jobId===jobItem?._id)}
        />
    </div>
  )
}
export default RecruiterJobCard