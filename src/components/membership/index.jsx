'use client'

import { candidateMembershipPlans, recruiterMembershipPlans } from "@/utils";
import { Button } from "../ui/button";
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecruiterMemberShipPlans from "../recruiter-membership-plans";
import CandidateMemberShipPlans from "../candidate-membership-plans";
import PlanDetailsModal from "../plan-details-card";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Membership = ({ profileInfo }) => {
    const[currentPlanDetails,setCurrentPlanDetails]=useState(null);
    const[showCurrentPlanModal,setShowCurrentPlanModal]=useState(false);

    const pathName = useSearchParams();

    const updateProfile = async () => {
        const fetchCurrentPlanFromSessionStorage = JSON.parse(sessionStorage.getItem('currentPlan'));

        await updateProfileAction({
            ...profileInfo,
            isPremiumUser: true,
            memberShipType: fetchCurrentPlanFromSessionStorage?.type,
            memberShipStartDate: new Date().toString(),
            memberShipEndDate: new Date(
                new Date().getFullYear() + 1,
                new Date().getMonth(),
                new Date().getDay()
            )
        }, '/membership');
    }

    const handlePayment = async (getCurrentPlan) => {
        const stripe = await stripePromise;

        const customerDetails = {
            name: profileInfo?.role==='recruiter'?profileInfo?.recruiterInfo?.name : profileInfo?.candidateInfo?.name,
            email: profileInfo?.email, 
            address: {
                line1: "123 Main St",
                city: "New Delhi",
                state: "Delhi",
                postal_code: "110001",
                country: "IN",
            },
            customerId: sessionStorage.getItem('customerId') || null  
        };

        const extractPriceId = await createPriceIdAction({
            amount: Number(getCurrentPlan?.price)
        });

        if (extractPriceId) {
            sessionStorage.setItem('currentPlan', JSON.stringify(getCurrentPlan));

            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1
                    }
                ],
                customer: customerDetails
            });

            // console.log(result);

            if (result?.id) {
                // Store the customer ID if a new customer is created during the session
                if (result?.customerId) {
                    sessionStorage.setItem('customerId', result.customerId);
                }

                await stripe.redirectToCheckout({
                    sessionId: result?.id
                });
            }
        }
        // console.log(extractPriceId);
    };

    useEffect(() => {
        if (pathName.get('status') === 'success') updateProfile();
    }, [pathName]);

    // console.log(profileInfo);

    const handleShowCurrentPlanDetails = () => {
        const planDetails = profileInfo?.role==='candidate'
            ? candidateMembershipPlans.find(planItem => planItem.type === profileInfo?.memberShipType)
            : recruiterMembershipPlans.find(planItem => planItem.type === profileInfo?.memberShipType);

        setCurrentPlanDetails(planDetails);
        setShowCurrentPlanModal(true);
    }

    const handleShowPlanDetails = (plan) => {
        setCurrentPlanDetails(plan);
        setShowCurrentPlanModal(true);
    }
    
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                    {profileInfo?.isPremiumUser
                        ? "You are a premium user"
                        : "Choose Your Best Plan"}
                </h1>
                <div>
                    {profileInfo?.isPremiumUser ? (
                        <Button onClick={handleShowCurrentPlanDetails} className="flex h-11 items-center justify-center px-5">
                            {
                                profileInfo?.role==='candidate'?candidateMembershipPlans.find(
                                    (planItem) => planItem.type === profileInfo?.memberShipType
                                ).heading
                                :
                                recruiterMembershipPlans.find(
                                    (planItem) => planItem.type === profileInfo?.memberShipType
                                ).heading
                            }
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            profileInfo?.role==='recruiter'?<RecruiterMemberShipPlans
                            profileInfo={profileInfo}  
                            plans={recruiterMembershipPlans} handlePayment={handlePayment}
                            showCurrentPlanModal={showCurrentPlanModal} 
                            setShowCurrentPlanModal={setShowCurrentPlanModal} 
                            currentPlanDetails={currentPlanDetails} 
                            setCurrentPlanDetails={setCurrentPlanDetails}  
                            handleShowPlanDetails={handleShowPlanDetails}                
                            />

                            :<CandidateMemberShipPlans 
                            profileInfo={profileInfo} plans={candidateMembershipPlans} 
                            handlePayment={handlePayment}
                            showCurrentPlanModal={showCurrentPlanModal} 
                            setShowCurrentPlanModal={setShowCurrentPlanModal} 
                            currentPlanDetails={currentPlanDetails} 
                            setCurrentPlanDetails={setCurrentPlanDetails} 
                            handleShowPlanDetails={handleShowPlanDetails}
                            />
                        }

                    </div>
                </div>
            </div>
            <PlanDetailsModal 
                showCurrentPlanModal={showCurrentPlanModal} 
                setShowCurrentPlanModal={setShowCurrentPlanModal} 
                currentPlanDetails={currentPlanDetails} 
                setCurrentPlanDetails={setCurrentPlanDetails} 
            />
        </div>
    );
}

export default Membership;
