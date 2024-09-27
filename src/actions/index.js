"use server";

import connectDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// const stripe = require("stripe")(
//   "sk_test_51OInvuSIwTefMaBqLWTJPq52CDBv0ltkez1R4DNhlazuGw3sOCzBrK5VHPG6735bQiJ7c3aVjkZ5uzOUIkLWUc6w00fRIgfslw"
// );


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createProfileAction(formData, pathToRevalidate) {
  await connectDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id) {
  await connectDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function createJobAction(formData, pathToRevalidate) {
  await connectDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchJobsForRecruiterAction(id) {
  await connectDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectDB();
  await Application.create(data);
  await Job.findByIdAndUpdate(
    data.jobId,
    {
      $push: {
        applicants: {
          name: data.name,
          email: data.email,
          userId: data.candidateUserId,
          status: data.status[0],
        },
      },
    },
    { new: true, useFindAndModify: false } // options
  );
  revalidatePath(pathToRevalidate);
}

export async function updateProfileAction(data, pathToRevalidate) {
  await connectDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;
  await Profile.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

export async function fetchJobApplicationsForCandidate(candidateId) {
  await connectDB();
  const result = await Application.find({ candidateUserId: candidateId });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApplicationsForRecruiter(recruiterId) {
  await connectDB();
  const result = await Application.find({ recruiterUserId: recruiterId });
  return JSON.parse(JSON.stringify(result));
}

export async function getCandidateDetailsByIdAction(currentCandidateId) {
  await connectDB();
  const result = await Profile.findOne({ userId: currentCandidateId });
  return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectDB();
  const {
    recruiterUserId,
    name,
    email,
    candidateUserId,
    status,
    jobId,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserId,
      name,
      email,
      candidateUserId,
      status,
      jobId,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

export async function filterAction() {
  await connectDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}





export async function createStripePaymentAction(data) {
  let customerId = data?.customer?.customerId;

  // If no customer ID is passed, create a new customer
  if (!customerId) {
    const customer = await stripe.customers.create({
      name: data?.customer?.name,
      email: data?.customer?.email,
      address: {
        city: data?.customer?.address?.city,
        country: data?.customer?.address?.country,
        line1: data?.customer?.address?.line1,
        postal_code: data?.customer?.address?.postal_code,
        state: data?.customer?.address?.state,
      },
    });
    
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: "http://localhost:3000/membership?status=success",
    cancel_url: "http://localhost:3000/membership?status=cancel",

    customer: customerId, // Pass the customer ID only
    billing_address_collection: "required", // Required for Indian regulations
  });
  // console.log("session", session);
  return {
    success: true,
    id: session?.id,
    customerId: customerId, // Return the new customer ID if created
  };
}
