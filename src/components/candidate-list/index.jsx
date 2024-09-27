"use client";

import { Fragment } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import {
  getCandidateDetailsByIdAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CandidateList = ({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobApplications,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) => {
  const handleFetchCandidateDetails = async (getCurrentCandidateId) => {
    const data = await getCandidateDetailsByIdAction(getCurrentCandidateId);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  };

  const handlePreviewResume = () => {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserId === currentCandidateDetails?.userId
    );
    const jobApplicantToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };
    await updateJobApplicationAction(jobApplicantToUpdate, "/jobs");
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications?.length > 0
          ? jobApplications.map((applicants, index) => (
              <div
                key={index}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold">{applicants?.name}</h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(applicants?.candidateUserId)
                    }
                    className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setShowCurrentCandidateDetailsModal(false);
          setCurrentCandidateDetails(null);
        }}
      >
        <DialogContent>
          <DialogTitle className="hidden"></DialogTitle>
          <div>
            <h1 className="text-xl font-extrabold ">
              {currentCandidateDetails?.candidateInfo?.name}
              {", "}
              {currentCandidateDetails?.email}
            </h1>
            <p>
              <span className="font-bold">Current Company: </span>
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p>
              <span className="font-bold">Current Job Location: </span>
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              <span className="font-bold">Salary: </span>
              {currentCandidateDetails?.candidateInfo?.currentSalary}
            </p>
            <p>
              <span className="font-bold">Total Experience: </span>
              {currentCandidateDetails?.candidateInfo?.totalExperience}
            </p>
            <p>
              <span className="font-bold">Notice Period: </span>
              {currentCandidateDetails?.candidateInfo?.noticePeriod}
            </p>
            <div className="flex flex-wrap gap-4 mt-6 items-center">
              <h1>Skills : </h1>
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((item, index) => (
                  <div
                    key={index}
                    className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] font-medium text-white">
                      {item}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 mt-6 items-center">
              <h1>Previous Companies : </h1>
              <div className="flex flex-wrap gap-4 mt-6 items-center">
                {currentCandidateDetails?.candidateInfo?.previousCompanies
                  .split(",")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                    >
                      <h2 className="text-[13px] font-medium text-white">
                        {item}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6 items-center">
              <h1>Socials : </h1>
              <div className="flex gap-4 items-center">
                {currentCandidateDetails?.candidateInfo?.linkedinProfile && (
                  <Link
                    href={currentCandidateDetails?.candidateInfo?.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-blue-600 text-2xl" />
                  </Link>
                )}
                {currentCandidateDetails?.candidateInfo?.githubProfile && (
                  <Link
                    href={currentCandidateDetails?.candidateInfo?.githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className={currentCandidateDetails?.candidateInfo?.githubProfile==="#"?'hidden'
                    :"text-black text-2xl"
                    } />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className="flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>

            {!jobApplications
              .find(
                (item) =>
                  item.candidateUserId === currentCandidateDetails?.userId
              )
              ?.status.includes("Rejected") && (
              <Button
                onClick={() => handleUpdateJobStatus("Selected")}
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId === currentCandidateDetails?.userId
                    )
                    ?.status.includes("Selected")
                    ? true
                    : false
                }
                className="disabled:bg-green-600 flex h-11 items-center justify-center px-5"
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserId === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected")
                  ? "Selected"
                  : "Select"}
              </Button>
            )}

            {!jobApplications
              .find(
                (item) =>
                  item.candidateUserId === currentCandidateDetails?.userId
              )
              ?.status.includes("Selected") && (
              <Button
                onClick={() => handleUpdateJobStatus("Rejected")}
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId === currentCandidateDetails?.userId
                    )
                    ?.status.includes("Rejected")
                    ? true
                    : false
                }
                className="disabled:bg-red-600 flex h-11 items-center justify-center px-5"
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserId === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? "Rejected"
                  : "Reject"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;
