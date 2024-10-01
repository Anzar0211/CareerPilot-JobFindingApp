import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CommonForm = ({action, btnType, isBtnDisabled, buttonText, formControls, formData, setFormData, handleFileChange}) => {

    const renderInputByComponentType = (control) => {
        let content = null;
        switch (control.componentType) {
            case 'input':
                content = (
                    <div className="relative flex items-center mt-8">
                        <Input
                            type="text"
                            disabled={control.disabled}
                            placeholder={control.placeholder}
                            name={control.name}
                            id={control.name}
                            value={formData?.[control.name] || ''}
                            onChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))}
                            className="w-full rounded-md h-[60px] px-4 border bg-gray-300 text-lg outline-none drop-shadow-md transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg
                            focus-visible:outline-none focus-visible:ring-0 focus-visible::ring-offset-0"
                        />
                    </div>
                );
                break;
            case 'file':
                content = (
                    <Label htmlFor={control.name} className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer">
                        <h2>{control.label}</h2>
                        <Input onChange={handleFileChange} id={control.name} type="file" className="hidden"/>
                    </Label>
                );
                break;
            default:
                content = (
                    <div className="relative flex items-center mt-8">
                        <Input
                            type="text"
                            disabled={control.disabled}
                            placeholder={control.placeholder}
                            name={control.name}
                            id={control.name}
                            value={formData?.[control.name] || ''}
                            onChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))}
                            className="w-full rounded-md h-[60px] px-4 border bg-gray-300 text-lg outline-none drop-shadow-md transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg
                            focus-visible:outline-none focus-visible:ring-0 focus-visible::ring-offset-0"
                        />
                    </div>
                );
                break;
        }
        return content;
    }

    return (
        <form onSubmit={action}>
            {formControls.map((control, index) => (
                <div key={index}>
                    {renderInputByComponentType(control)}
                </div>
            ))}
            <div className="mt-6 w-full">
                <Button type={btnType || "submit"} disabled={isBtnDisabled} className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}

export default CommonForm