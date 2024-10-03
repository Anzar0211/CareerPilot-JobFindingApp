import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import PlanDetailsModal from "../plan-details-card";
import { Button } from "../ui/button";


const CandidateMemberShipPlans = ({profileInfo, plans,handlePayment,handleShowPlanDetails,showCurrentPlanModal,setShowCurrentPlanModal,currentPlanDetails,setCurrentPlanDetails }) => {
    return (
        <>
            {plans.map((plan, index) => (
                <CommonCard
                key={index} // Add key for each item in the map
                icon={
                    <div className="flex justify-between">
                    <div>
                        <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan.heading}</h1>
                    </div>
                }
                title={`Rs ${plan.price} /yr`}
                description={plan.type}
                footerContent={
                    <div className="flex space-x-4">
                    <Button onClick={()=>handleShowPlanDetails(plan)} className="dark:bg-black dark:text-white flex h-11 items-center justify-center px-5">
                        View Details
                    </Button>

                    {profileInfo?.memberShipType === "Gold" ||
                    (profileInfo?.memberShipType === "Bronze" && index === 0) ||
                    (profileInfo?.memberShipType === "Silver" &&
                        index >= 0 &&
                        index < 2) ? null : (
                        <Button
                        onClick={() => handlePayment(plan)}
                        className="disabled:opacity-65 dark:bg-black dark:text-white flex h-11 items-center justify-center px-5"
                        >
                        {profileInfo?.memberShipType === "Bronze" ||
                        profileInfo?.memberShipType === "Silver"
                            ? "Update Plan"
                            : "Get Premium"}
                        </Button>
                    )}
                    </div>
                }
                />
            ))}
            <PlanDetailsModal 
                showCurrentPlanModal={showCurrentPlanModal} 
                setShowCurrentPlanModal={setShowCurrentPlanModal} 
                currentPlanDetails={currentPlanDetails} 
                setCurrentPlanDetails={setCurrentPlanDetails} 
            />
        </>
    );
};
export default CandidateMemberShipPlans;

