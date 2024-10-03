'use client'

import { Fragment, useState } from "react"
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { initialEditJobFormData } from "@/utils";
import CommonForm from "../common-form";
import { handleCloseJobStatusAction, updateJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const RecruiterJobDetailsCard = ({jobItem}) => {
    const{toast}=useToast();
    const [isClosed, setIsClosed] = useState(jobItem.isClosed);
    const [showJobDetails, setShowJobDetails] = useState(null);
    const [showJobDetailsDialog, setShowJobDetailsDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editedJobData, setEditedJobData] = useState(initialEditJobFormData);

    const handleShowJobDetails = (jobItem) => {
        setShowJobDetails(jobItem);
        setShowJobDetailsDialog(true);
    }

    const handleEditJobDetails = (jobItem) => {
        setEditedJobData({
            _id: jobItem._id,
            title: jobItem.title,
            type: jobItem.type,
            location: jobItem.location,
            experience: jobItem.experience,
            description: jobItem.description,
            skills: jobItem.skills,
        });
        setShowEditDialog(true);
    }

    const handleUpdateJob = async (e) => {
        e.preventDefault();
        try {
            await updateJobAction(editedJobData, '/jobs');
            setShowEditDialog(false);
            setEditedJobData(initialEditJobFormData);
            toast({
                title: 'Job Updated',
                description: 'Job details updated successfully',
            });
        } catch (error) {
            console.error('Error updating job:', error);
            toast({
                variant: 'destructive',
                title: 'Something went wrong!',
            });
        }
    }

  const handleCloseJob = async () => {
    try {
      await handleCloseJobStatusAction(jobItem._id);  
      setIsClosed(true);  
      toast({
        title: 'Job Closed',
        description: 'The job has been successfully closed.',
      });
    } catch (error) {
      console.error('Error closing job:', error);
      toast({
        variant: 'destructive',
        title: 'Error closing job!',
      });
    }
  };

    return (
        <Fragment>
            <CommonCard
                icon={<JobIcon/>}
                title={jobItem.title}
                description={jobItem.description}
                footerContent={
                    <div className="flex gap-4">
                        <Button onClick={() => handleShowJobDetails(jobItem)} className="flex h-11 items-center justify-center px-5 dark:bg-black dark:text-white">
                            View 
                        </Button>
                        <Button onClick={() => handleEditJobDetails(jobItem)} className="flex h-11 items-center justify-center px-5 dark:bg-black dark:text-white">
                            Edit
                        </Button>
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            className="flex h-11 items-center justify-center px-5 dark:bg-black dark:text-white"
                            disabled={isClosed} // Disable the button if the job is closed
                            >
                            {isClosed ? "Closed" : "Close"}  {/* Toggle between Close and Closed */}
                            </Button>
                        </AlertDialogTrigger>
                        {!isClosed && (
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Close Job</AlertDialogTitle>
                                <AlertDialogDescription>
                                Are you sure you want to close this job? Once closed, the job will no longer accept new applications.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCloseJob}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        )}
                        </AlertDialog>
                    </div>
                }
            />
            <Dialog
                open={showJobDetailsDialog}
                onOpenChange={() => {
                    setShowJobDetailsDialog(false);
                    setShowJobDetails(null);
                }}
            >
                <DialogContent>
                    <DialogTitle className="hidden"></DialogTitle>
                    <div>
                        <p><span className="font-bold">Company Name: </span>{jobItem?.companyName}</p>
                        <p><span className="font-bold">Title: </span>{jobItem?.title}</p>
                        <p><span className="font-bold">Job Location: </span>{jobItem?.location}</p>
                        <p><span className="font-bold">Type: </span>{jobItem?.type}</p>
                        <p><span className="font-bold">Experience Required: </span>{jobItem?.experience}</p>
                        <p><span className="font-bold">Job Description: </span>{jobItem?.description}</p>
                        <div className="flex flex-wrap gap-4 mt-6 items-center">
                            <h1>Skills : </h1>
                            {jobItem?.skills.split(",").map((item, index) => (
                                <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px] dark:bg-white">
                                    <h2 className="text-[13px] font-medium text-white dark:text-black">{item}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={showEditDialog}
                onOpenChange={() => {
                    setShowEditDialog(false);
                    setEditedJobData(initialEditJobFormData);
                }}
            >
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogTitle className="font-bold text-xl">Edit Job Details</DialogTitle>
                    <CommonForm
                        formControls={[
                            { componentType: 'input', name: 'title', placeholder: 'Job Title' },
                            { componentType: 'input', name: 'type', placeholder: 'Job Type' },
                            { componentType: 'input', name: 'location', placeholder: 'Job Location' },
                            { componentType: 'input', name: 'experience', placeholder: 'Required Experience' },
                            { componentType: 'input', name: 'description', placeholder: 'Job Description' },
                            { componentType: 'input', name: 'skills', placeholder: 'Required Skills (comma-separated)' },
                        ]}
                        formData={editedJobData}
                        setFormData={setEditedJobData}
                        buttonText="Update Job"
                        action={handleUpdateJob}
                    />
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default RecruiterJobDetailsCard