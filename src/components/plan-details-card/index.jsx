import { Dialog,DialogContent,DialogTitle } from "../ui/dialog"

const PlanDetailsModal = ({showCurrentPlanModal,setShowCurrentPlanModal,currentPlanDetails,setCurrentPlanDetails}) => {
  return (
    <Dialog open={showCurrentPlanModal} onOpenChange={()=>{
        setShowCurrentPlanModal(false);
        setCurrentPlanDetails(null)
    }}>
        <DialogContent>
            <DialogTitle className="hidden"></DialogTitle>
          <div>
            <h1 className="text-xl font-extrabold ">
              {currentPlanDetails?.heading}
            </h1>
            <p>
              <span className="font-bold">Plan Name: </span>
              {currentPlanDetails?.type}
            </p>

            <div className="mt-6">
            <h1>Features:</h1>
            <ul className="list-disc pl-5">
                {currentPlanDetails?.benefits.map((item) => (
                <li key={item}>
                    {item}
                </li>
                ))}
            </ul>
            </div>
          </div>
        </DialogContent>
    </Dialog>
  )
}
export default PlanDetailsModal