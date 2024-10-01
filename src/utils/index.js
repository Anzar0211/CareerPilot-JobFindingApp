import qs from "query-string";

export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your current company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter your current job location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your current salary(in LPA)",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your notice period(in Days/Months)",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter your previous companies",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience(in Years)",
    componentType: "input",
  },
  {
    label: "College Name",
    name: "college",
    placeholder: "Enter your college name",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your college location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter your year of graduation",
    componentType: "input",
  },
  {
    label: "LinkedIn Profile",
    name: "linkedinProfile",
    placeholder: "Enter your LinkedIn profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder:
      "Enter your Github profile/Enter '#' in case of no Github Profile",
    componentType: "input",
  },
];

export const initialCandidateFormData = {
  resume: "",
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};
export const initialCandidateUpdateFormData = {
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const postNewJobFormControls = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter company name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Title",
    name: "title",
    placeholder: "Enter Job title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Enter job type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Enter job location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Enter job experience(in Years)",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter job description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter job skills",
    componentType: "input",
  },
];

export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};
export const initialEditJobFormData = {
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuData = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "title",
    label: "Title",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentUrl = qs.parse(params);
  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentUrl[key];
      else currentUrl[key] = dataToAdd[key].join(",");
    });
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}

export const candidateToasts = [
  {
    type: "free Tier",
    title: "You can apply to maximum 2 Jobs",
    description: "Upgrade to Premium Plans to post more jobs",
  },
  {
    type: "1st Tier",
    title: "You can apply to maximum 5 Jobs",
    description: "Upgrade to Silver/Gold plans to apply to more jobs",
  },
  {
    type: "2nd Tier",
    title: "You can apply to maximum 20 Jobs",
    description: "Upgrade to Gold plan to apply for more jobs",
  },
];
export const recruiterToasts = [
  {
    type: "free Tier",
    title: "You can post maximum 2 Jobs",
    description: "Upgrade to Premium Plan to post more jobs",
  },
  {
    type: "1st Tier",
    title: "You can post maximum 5 Jobs",
    description: "Upgrade to Teams/Enterprise plans to post more jobs",
  },
  {
    type: "2nd Tier",
    title: "You can post maximum 10 Jobs",
    description: "Upgrade to Enterprise plans to post more jobs",
  },
];

export const recruiterMembershipPlans = [
  {
    heading: "Tier 1",
    price: 2000,
    type: "Basic",
    benefits: [
      "Post 5 Jobs",
      "View 10 Resumes",
      "Select among great working professionals according to requirements",
    ],
  },
  {
    heading: "Tier 2",
    price: 5000,
    type: "Teams",
    benefits: [
      "Post 10 Jobs",
      "View 20 Resumes",
      "Select among great working professionals according to requirements",
    ],
  },
  {
    heading: "Tier 3",
    price: 10000,
    type: "Enterprise",
    benefits: [
      "Post Unlimited Jobs",
      "View Unlimited Resumes",
      "Select among great working professionals according to requirements",
    ],
  },
];

export const candidateMembershipPlans = [
  {
    heading: "Tier 1",
    price: 500,
    type: "Bronze",
    benefits: [
      "Apply 5 Jobs",
      "Filter Companies according to requirements",
      "Select among the top Product Based Companies",
    ],
  },
  {
    heading: "Tier 2",
    price: 3000,
    type: "Silver",
    benefits: [
      "Apply 20 Jobs",
      "Filter Companies according to requirements",
      "Select among the top Product Based Companies",
    ],
  },
  {
    heading: "Tier 3",
    price: 5000,
    type: "Gold",
    benefits: [
      "Apply for Unlimited Jobs",
      "Get Latest job postings",
      "Select among the top Product Based Companies",
    ],
  },
];
