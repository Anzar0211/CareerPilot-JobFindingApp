import { fetchJobApplicationsForCandidate, fetchJobsForCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server"

const ActivityPage = async() => {
    const user=await currentUser();
    const jobList=await fetchJobsForCandidateAction();
    const candidateJobApplications=await fetchJobApplicationsForCandidate(user?.id);
  return (
    <CandidateActivity
        jobList={jobList}
        candidateJobApplications={candidateJobApplications}
    />
  )
}
export default ActivityPage