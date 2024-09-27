import { fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction, filterAction } from "@/actions";
import JobListings from "@/components/job-list"
import { currentUser } from "@clerk/nextjs/server";


const JobsPage = async({searchParams}) => {
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    const jobList=profileInfo?.role==="candidate"
    ? await fetchJobsForCandidateAction(searchParams)
    :await fetchJobsForRecruiterAction(user?.id);

    const getJobApplications=profileInfo?.role==="candidate"
    ? await fetchJobApplicationsForCandidate(user?.id)
    :await fetchJobApplicationsForRecruiter(user?.id);

    const fetchFilterCategories=await filterAction()

    return (
        <JobListings user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} jobList={jobList}
        jobApplications={getJobApplications}
        filterCategories={fetchFilterCategories}
        />
    )
}
export default JobsPage