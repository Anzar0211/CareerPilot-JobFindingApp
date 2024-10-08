import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import PlanDetailsModal from "../plan-details-card";
import { Button } from "../ui/button";


const RecruiterMemberShipPlans = ({profileInfo,plans,handlePayment,handleShowPlanDetails,showCurrentPlanModal,setShowCurrentPlanModal,currentPlanDetails,setCurrentPlanDetails}) => {
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
                <Button onClick={()=>handleShowPlanDetails(plan)} className="flex h-11 items-center justify-center px-5 ">
                    View Details
                </Button>

                {profileInfo?.memberShipType === "Enterprise" ||
                (profileInfo?.memberShipType === "Basic" && index === 0) ||
                (profileInfo?.memberShipType === "Teams" &&
                    index >= 0 &&
                    index < 2) ? null : (
                    <Button
                    onClick={() => handlePayment(plan)}
                    className="disabled:opacity-65  flex h-11 items-center justify-center px-5"
                    >
                    {profileInfo?.memberShipType === "Basic" ||
                    profileInfo?.memberShipType === "Teams"
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
  )
}
export default RecruiterMemberShipPlans