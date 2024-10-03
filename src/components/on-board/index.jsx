"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// const supabaseClient=createClient('https://ijmucmgpoepufvkcnoou.supabase.co',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbXVjbWdwb2VwdWZ2a2Nub291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MjIzMjAsImV4cCI6MjA0MTk5ODMyMH0.Om1L0aqE6sbs6TwS8p_sfp8nbgn7nXiNiq8AuAzsQKs")
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const OnBoard = () => {
    const[currentTab,setCurrentTab]=useState("candidate");
    const[recruiterFormData,setRecruiterFormData]=useState(initialRecruiterFormData);
    const[candidateFormData,setCandidateFormData]=useState(initialCandidateFormData);
    const[file,setFile]=useState(null);

    const currentAuthUser=useUser();
    const{user}=currentAuthUser;

    const handleFileChange=(e)=>{
      e.preventDefault();
      setFile(e.target.files[0]);
    }

    const handleTabChange=(value)=>{
        setCurrentTab(value)
    } 

    const handleRecruiterFormValid=()=>{
      return recruiterFormData && 
      recruiterFormData.name.trim()!=="" && recruiterFormData.companyName.trim()!=="" &&
      recruiterFormData.companyRole.trim()!==""
    }

    const handleCandidateFormValid=()=>{
      return Object.keys(candidateFormData).every(key=>candidateFormData[key].trim() !=="")
    }

    const createProfile=async()=>{
      const data=currentTab==="candidate" ?
      {
        candidateInfo:candidateFormData,
        role:"candidate",
        isPremiumUser:false,
        userId:user?.id,
        email:user?.primaryEmailAddress?.emailAddress,        
      }
      :{
        recruiterInfo:recruiterFormData,
        role:'recruiter',
        isPremiumUser:false,
        userId:user?.id,
        email:user?.primaryEmailAddress?.emailAddress,
      }
      await createProfileAction(data,"/onboard");
    }
    const handleFileUploadPdfToSupabase=async()=>{
      const { data, error } = await supabaseClient.storage.from('job-board-public').upload(`/public/${file.name}`,file,{
        cacheControl:"3600",
        upsert:false
      })
      // console.log(data,error);
      if(data){
        setCandidateFormData({
          ...candidateFormData,
          resume:data.path
        })
      }
    }

    useEffect(()=>{
      if(file) handleFileUploadPdfToSupabase()
    },[file])

    // console.log(candidateFormData);
  return (
    <div className="bg-white dark:bg-black">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex md:flex-row gap-4 flex-col items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900">
              Welcome to Onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
            <CommonForm formControls={candidateOnboardFormControls}
            formData={candidateFormData}
            buttonText={"Onboard as a Candidate!"}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValid()}
            action={createProfile}
            />
        </TabsContent>
        <TabsContent value="recruiter">
            <CommonForm formControls={recruiterOnboardFormControls}
            buttonText={"Onboard as a Recruiter!"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfile}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default OnBoard