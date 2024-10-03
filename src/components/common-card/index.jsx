import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const CommonCard = ({icon,title,description,footerContent}) => {
  return (
    <Card className="flex bg-gray-100 dark:bg-slate-900 flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer dark:border-blue-950 dark:hover:shadow-2xl dark:hover:shadow-blue-950 dark:hover:border-1">
        <CardHeader className="p-0 ">
            {
                icon?icon:null
            }
            {
                title?
                <CardTitle className="text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold dark:text-white text-gray-900">{title}</CardTitle>
                :null
            }
            {
                description?
                <CardDescription className="mt-3 dark:text-gray-200 text-gray-700">{description}</CardDescription>
                :null
            }
        </CardHeader>
        <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  )
}
export default CommonCard