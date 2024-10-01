import { fetchJobsForRecruiterAction, fetchProfileAction,fetchJobApplicationsForRecruiter } from "@/actions";
import RecruiterJobsDashboard from "@/components/recruiter-jobs-dashboard";
import { currentUser } from "@clerk/nextjs/server";




const ApplicantsPage = async() => {
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    const jobList=await fetchJobsForRecruiterAction(user?.id);
    const getJobApplications=await fetchJobApplicationsForRecruiter(user?.id);
    return (
        <RecruiterJobsDashboard user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} jobList={jobList}
        jobApplications={getJobApplications}
        />
    )
}
export default ApplicantsPage