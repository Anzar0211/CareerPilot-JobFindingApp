'use client'

import { filterMenuData, formUrlQuery } from "@/utils"
import CandidateJobCard from "../candidate-job-card"
import PostNewJob from "../post-new-job"
// import RecruiterJobCard from "../recruiter-job-card"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import RecruiterJobDetailsCard from "../recruiter-job-details-card"

const JobListings = ({user, profileInfo, jobList, jobApplications, filterCategories}) => {
    const [filterParams, setFilterParams] = useState({})
    const searchParams = useSearchParams();
    const router = useRouter()
    const filterMenus = filterMenuData.map(item => ({
        id: item.id,
        name: item.label,
        options: [...new Set(filterCategories.map(listItem => listItem[item.id]))]
    }))

    const handleFilter = (getSectionId, currentOption) => {
        let cpyFilterParams = {...filterParams};
        const indexOfCurrentSection = Object.keys(cpyFilterParams).indexOf(getSectionId);
        if (indexOfCurrentSection === -1) {
            cpyFilterParams = {
                ...cpyFilterParams,
                [getSectionId]: [currentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilterParams[getSectionId].indexOf(currentOption);
            if (indexOfCurrentOption === -1) {
                cpyFilterParams[getSectionId].push(currentOption)
            } else {
                cpyFilterParams[getSectionId].splice(indexOfCurrentOption, 1)
            }
        }
        setFilterParams(cpyFilterParams);
        sessionStorage.setItem('filterParams', JSON.stringify(cpyFilterParams))
    }

    useEffect(() => {
        setFilterParams(JSON.parse(sessionStorage.getItem('filterParams')))
    }, [])

    useEffect(() => {
        if (filterParams && Object.keys(filterParams).length > 0) {
            let url = '';
            url = formUrlQuery({
                params: searchParams.toString(),
                dataToAdd: filterParams
            })
            router.push(url, {scroll: false})
        }
    }, [filterParams, searchParams])

    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-baseline justify-between border-b border-gray-200 pb-6 pt-24 md:flex-row">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0">
                        {profileInfo?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}
                    </h1>
                    <div className="w-full md:w-auto">
                        {profileInfo?.role === "candidate" ? (
                            <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:space-x-2">
                                {filterMenus.map((menu, index) => (
                                    <Menubar key={index} className="w-full">
                                        <MenubarMenu>
                                            <MenubarTrigger className="w-full justify-between">
                                                {menu.name}
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                {menu.options.map((option, optionIndex) => (
                                                    <MenubarItem key={optionIndex} className="flex items-center" onClick={() => handleFilter(menu.id, option)}>
                                                        <div className={`h-4 w-4 border rounded border-l-gray-900 text-indigo-600 ${filterParams && Object.keys(filterParams).length > 0 && filterParams[menu.id] && filterParams[menu.id].indexOf(option) > -1 ? "bg-black" : ""}`} />
                                                        <Label className="ml-3 cursor-pointer text-sm text-gray-600">{option}</Label>
                                                    </MenubarItem>
                                                ))}
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                ))}
                            </div>
                        ) : (
                            <PostNewJob user={user} profileInfo={profileInfo} jobList={jobList} />
                        )}
                    </div>
                </div>
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto space-y-8 p-0">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {jobList && jobList.length > 0 ? (
                                        jobList.map((job, index) => (
                                            profileInfo?.role === "candidate" ? (
                                                <CandidateJobCard
                                                    key={index}
                                                    jobItem={job}
                                                    profileInfo={profileInfo}
                                                    jobApplications={jobApplications}
                                                />
                                            ) : (
                                                <RecruiterJobDetailsCard
                                                    key={index}
                                                    jobItem={job}
                                                    profileInfo={profileInfo}
                                                />
                                            )
                                        ))
                                    ) : (
                                        <h1 className="text-3xl font-bold">No Jobs Found!!</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListings